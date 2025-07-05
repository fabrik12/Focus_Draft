# focus_draft_backend/api/views.py

from datetime import timezone, date
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated # Para el registro, no se requiere autenticación
from .serializers import UserSerializer # Importa el serializer que acabamos de crear

from django.contrib.auth.models import User

from .models import Project, Task, Draft, PomodoroSession
from .serializers import TaskSerializer, DraftSerializer, PomodoroSessionSerializer

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
    
class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user).order_by('-created_at')
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)
    
    def update(self, request, *args, **kwargs):
        partial = True # Forzar la actualización parcial
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly refresh the instance from the database.
            instance = self.get_object()
        return Response(serializer.data)
    

class DraftListCreateView(generics.ListCreateAPIView):
    serializer_class = DraftSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Draft.objects.filter(user=self.request.user).order_by('-created_at')
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class DraftDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DraftSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Draft.objects.filter(user=self.request.user)
    
class PomodoroSessionListCreateView(generics.ListCreateAPIView):
    serializer_class = PomodoroSessionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return PomodoroSession.objects.filter(user=self.request.user).order_by('-completed_at')
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PomodoroSessionTodayCountView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        today = date.today()
        count = PomodoroSession.objects.filter(
            user=request.user,
            completed_at__date=today
        ).count()
        return Response({"count": count}, status=status.HTTP_200_OK)
        