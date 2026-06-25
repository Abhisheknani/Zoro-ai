from django.urls import path , include
from rest_framework.routers import  DefaultRouter
from . import views
from .streaming import hello_stream , ChatStreamView

router = DefaultRouter()
router.register('conversations', views.ConversationViewSet , basename='conversation')
router.register('messages', views.MessageViewSet , basename='message')



urlpatterns = [
    # path('new/', views.new_chat_view, name='new_chat'),
    path('', include(router.urls)),
    path('stream/hello', hello_stream, name='hello_stream'),
    path('stream/chat/', ChatStreamView.as_view(), name='fake_chat_stream'),
]


