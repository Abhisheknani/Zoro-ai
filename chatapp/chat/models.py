from django.db import models
from django.conf import settings

# Create your models here.


class Conversation(models.Model):

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length = 255)
    created_at = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.title

class Message(models.Model):

    conversation = models.ForeignKey(Conversation, on_delete = models.CASCADE, related_name='messages')
    role = models.CharField(max_length = 50)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return f'{self.role}: {self.content[:50]}'
    

