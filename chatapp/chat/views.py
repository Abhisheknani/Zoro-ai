from django.shortcuts import render
from rest_framework import viewsets
from django.http import HttpResponse
from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer
from rest_framework.response import Response
from accounts.serializers import UserSerializer
from rest_framework.views import APIView
from django.core.cache import cache

# Create your views here.

class ConversationViewSet(viewsets.ModelViewSet):
    serializer_class = ConversationSerializer
    search_fields = ['title']
    ordering_fields = ['created_at']
    ordering = ['-created_at']

    def get_queryset(self):
        user = self.request.user
        return Conversation.objects.filter(user=user)
    
    
    def list(self, request, *args, **kwargs):

        key = f"conversations:{request.user.user_id}"

        cached = cache.get(key)

        if cached is not None:
            return Response(cached)
        ## WAY - 1
        # queryset = self.get_queryset()
        # page = self.paginate_queryset(queryset)
        # serializer = self.get_serializer(page, many=True)
        # response = self.get_paginated_response(serializer.data)

        ## WAY - 2
        response = super().list(request, *args, **kwargs)

        resp = {
            'message': 'List of conversations fetched',
            'count' : response.data['count'],
            'user': UserSerializer(request.user).data,
            'conversations': response.data,
            'status': 'success'
        }
        cache.set(key, resp, timeout=60)

        return Response(resp)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        cache.delete(f"conversations:{self.request.user.user_id}")

    def perform_update(self, serializer):
        serializer.save()
        cache.delete(f"conversations:{self.request.user.user_id}")


    def perform_destroy(self, instance):
        uid = instance.user.user_id
        instance.delete()
        cache.delete( f"conversations:{uid}")

        

class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer

    def get_queryset(self):
        user = self.request.user
        return Message.objects.filter(conversation__user=user).select_related('conversation')
    
    


    def list(self, request, *args, **kwargs):
        key = f"messages:{request.user.user_id}"
    
        cached = cache.get(key)

        if cached is not None:
            return Response(cached)
        
        
        response = super().list(request, *args, **kwargs)
        cache.set(key, response.data, timeout=60)
        return response.data





