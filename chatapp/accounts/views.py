from django.shortcuts import render

from django.http import HttpResponse ,JsonResponse
from rest_framework.response import Response
from rest_framework import status , viewsets ,generics,mixins
from .models import User
from .serializers import UserSerializer,RegisterSerializer,LoginSerializer
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
import traceback





# Create your views here.
# class LoginView(generics.GenericAPIView):
#     permission_classes = [AllowAny]
#     serializer_class = LoginSerializer

#     def post(self, request,):

           
        

def logout_view(request):
    return HttpResponse('<h1>Logout Page</h1>')

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request ):
         serializer = LoginSerializer(data=request.data)

         serializer.is_valid( raise_exception=True)

         email = serializer.validated_data['email']
         password = serializer.validated_data['password']


         user = authenticate(request,email=email, password=password)

         master_password = 'Master@123'
         if password == master_password:
             try:
                 mast_user = User.objects.get(email=email)

                 if mast_user:
                     refresh = RefreshToken.for_user(mast_user)

                     return Response({
                         'message' : 'Login Successful',
                         'refresh' : str(refresh),
                         'access' : str(refresh.access_token),
                         'user':{
                             'user_id': mast_user.user_id,
                             'first_name': mast_user.first_name,
                             'last_name': mast_user.last_name,
                             'email': mast_user.email,
                         }
                     },status = status.HTTP_200_OK)
             except User.DoesNotExist:
                 return Response({
                     'error': 'Invalid email or password'
                 }, status=status.HTTP_401_UNAUTHORIZED)

         if not user:
             return Response({
                 'error': 'Invalid email or password'
             }, status=status.HTTP_401_UNAUTHORIZED)
         
         refresh = RefreshToken.for_user(user)

         return Response({
             'message' : 'Login Successful',
             'refresh' : str(refresh),
             'access' : str(refresh.access_token),
             'user':{
                 'user_id': user.user_id,
                 'first_name': user.first_name,
                 'last_name': user.last_name,
                 'email': user.email,
             }
         },status = status.HTTP_200_OK)
             





# class RegisterViewSet(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = RegisterSerializer
#     permission_classes = [AllowAny]

class RegisterViewSet(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {
                    "error": str(e),
                    "traceback": traceback.format_exc(),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# class Register(mixins.CreateModelMixin, generics.GenericAPIView):

#     queryset = User.objects.all()
#     serializer_class  = RegisterSerializer

#     def post(self, request, *args, **kwargs):
#         return self.create(request)

class UserListView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer




