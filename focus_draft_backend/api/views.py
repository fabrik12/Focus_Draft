# focus_draft_backend/api/views.py

from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny # Para el registro, no se requiere autenticación
from .serializers import UserSerializer # Importa el serializer que acabamos de crear
from django.contrib.auth.models import User

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,) # Permitir a cualquiera registrarse
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        # from rest_framework_simplejwt.tokens import RefreshToken
        # refresh = RefreshToken.for_user(user)
        # return Response({
        #     "user": UserSerializer(user).data,
        #     "refresh": str(refresh),
        #     "access": str(refresh.access_token),
        # }, status=status.HTTP_201_CREATED)
        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)