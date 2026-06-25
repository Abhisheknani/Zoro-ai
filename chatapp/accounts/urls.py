from django.urls import path ,include
from . import views
from rest_framework.routers import  DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView ,TokenRefreshView 


router = DefaultRouter()
router.register('users', views.UserListView)


urlpatterns = [
    path('register/', views.RegisterViewSet.as_view(), name='register'),
    # path('login/', TokenObtainPairView.as_view(), name='login'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('', include(router.urls)),
]