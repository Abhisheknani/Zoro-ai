
from rest_framework import serializers
from .models import Conversation, Message
from accounts.serializers import UserSerializer


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'
        read_only_fields = ('created_at',)

class ConversationSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)
    class Meta:
        model = Conversation
        fields = '__all__'
        read_only_fields = ('created_at', 'user')


