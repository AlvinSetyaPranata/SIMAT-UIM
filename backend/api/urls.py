from django.urls import path
from rest_framework_simplejwt.views import (TokenRefreshView, TokenObtainPairView)
from . import views

urlpatterns = [
    path('user/register/', views.Register.as_view()),
    path('user/auth/', TokenObtainPairView.as_view()),
    path('user/auth/refresh/', TokenRefreshView.as_view()),
]