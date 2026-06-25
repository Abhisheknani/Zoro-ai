import time, random
from django.http import StreamingHttpResponse, JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Conversation, Message
import asyncio
from rest_framework.views import APIView
from .serializers import MessageSerializer
from rest_framework.throttling import ScopedRateThrottle



def hello_stream(request):

    def event_generator():

        for word in "Hello from ZOROAI! is everything Good?".split():

            yield f"{word}\n"
            time.sleep(0.5)
        yield 'data: [DONE]\n\n'
    
    response = StreamingHttpResponse(event_generator(), content_type='text/event-stream')
    response['Cache-Control'] = 'no-cache'
    response['X-Accel-Buffering'] = 'no'
    return response

Fake_resposnes =[
    'Hey there ! How can I assist you today?',
    'Sure! Let me think through this step by step.',
    'Great question. Here is my take on it.',
    'Interesting. There are three angles to consider here.',
]


class ChatStreamView(APIView):
    permission_classes=[IsAuthenticated]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'streaming'


    def post(self,request):

     ## This below code is to create message object directly without validating the serializer.
        # cid = request.data.get('conversation_id')
        # content = request.data.get('message', '')
        # role = request.data.get('role', 'user')
        # print(cid , content , role)

        # The below lines are the code to create message object directly without validating the serializer in try block.
            # serializer = MessageSerializer(data = {'conversation':conversation.id, 'role': role, 'content': content})
            # Message.objects.create(conversation=conversation , role=role, content=content)



        '''
        the below code is to validate the serializer for comparind data=request.data directly with the serializer 
        fields and then creating the message object.
        '''
        cid = request.data.get('conversation')
        content = request.data.get('content', '')
        role = request.data.get('role', 'user')
        print(cid , content , role)

        try:
            conversation = Conversation.objects.get(id=cid,user = request.user)

            serializer = MessageSerializer(data = request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()


        except Conversation.DoesNotExist:
            return JsonResponse({'error': 'conversation Not found'}, status=404)
        
        bot_response = random.choice(Fake_resposnes)
        
        def gen():
            full_message = ''
            for word in bot_response.split():
                chunk = word + ' '
                full_message += chunk
                yield f'data: {{"type": "text", "content": "{chunk}"}}\n\n'
                time.sleep(0.08)
            Message.objects.create(conversation=conversation, role='bot', content=full_message.strip())
            yield 'data: [DONE]\n\n'

        resp = StreamingHttpResponse(gen(), content_type='text/event-stream')
        resp['Cache-Control'] = 'no-cache'
        resp['X-Accel-Buffering'] = 'no'
        return resp
        
            





# chat/streaming.py:


# import time, random
# from django.http import StreamingHttpResponse, JsonResponse
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from .models import Conversation, Message

# FAKE_RESPONSES = [
#     "Sure! Let me think through this step by step.",
#     "Great question. Here is my take on it.",
#     "Interesting. There are three angles to consider here.",
# ]

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def fake_chat_stream(request):
#     cid = request.data.get('conversation_id')
#     user_text = request.data.get('message', '')
#     try:
#         conversation = Conversation.objects.get(id=cid, user=request.user)
#     except Conversation.DoesNotExist:
#         return JsonResponse({'error': 'Not found'}, status=404)

#     Message.objects.create(conversation=conversation, role='user', content=user_text)
#     response_text = random.choice(FAKE_RESPONSES)

#     def gen():
#         full = ''
#         for token in response_text.split():
#             chunk = token + ' '
#             full += chunk
#             yield f"data: {chunk}\n\n"
#             time.sleep(0.08)
#         Message.objects.create(conversation=conversation, role='assistant', content=full.strip())
#         yield "data: [DONE]\n\n"

#     resp = StreamingHttpResponse(gen(), content_type='text/event-stream')
#     resp['Cache-Control'] = 'no-cache'
#     resp['X-Accel-Buffering'] = 'no'
#     return resp
# chat/urls.py:


# from .streaming import hello_stream, fake_chat_stream
# urlpatterns += [
#     path('stream/hello/', hello_stream),
#     path('stream/chat/', fake_chat_stream),
# ]
# Test (Windows cmd):


