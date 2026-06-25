from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password', 'phone']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self,validated_data):
        return User.objects.create_user(**validated_data)


# class LoginSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['email', 'password']
#         extra_kwargs = {'password': {'write_only': True}}

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True) 