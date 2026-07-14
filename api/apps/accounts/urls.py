from django.urls import path
from .views import RegisterView, CustomTokenObtainPairView, LogoutView, ProfileView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register', RegisterView.as_view(), name='auth_register'),
    path('login', CustomTokenObtainPairView.as_view(), name='auth_login'),
    path('logout', LogoutView.as_view(), name='auth_logout'),
    path('profile', ProfileView.as_view(), name='auth_profile'),
    path('refresh', TokenRefreshView.as_view(), name='auth_refresh'),
]
