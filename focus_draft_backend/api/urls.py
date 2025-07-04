# focus_draft_backend/api/urls.py

from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import RegisterView

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'), # Endpoint para obtener Access y Refresh tokens
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # Endpoint para refrescar el token de acceso
]