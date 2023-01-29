from django.urls import path
from rest_framework_simplejwt.views import (TokenRefreshView, TokenVerifyView)
from . import views

urlpatterns = [
    path('user/register/', views.Register.as_view()),
    path('user/auth/', views.Login.as_view()),
    path('user/auth/refresh/', TokenRefreshView.as_view()),
    path('user/auth/verify/', TokenVerifyView.as_view()),
]