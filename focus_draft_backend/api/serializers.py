# focus_draft_backend/api/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password') # Añadimos 'username' aunque el TDD solo menciona email

    def create(self, validated_data):
        # Crear el usuario y hashear la contraseña
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    
from .models import Project, Task, Draft, PomodoroSession

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'description', 'is_completed', 'created_at', 'project']
        read_only_fields = ['id', 'created_at']

class DraftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Draft
        fields = ['id', 'title', 'content', 'created_at', 'updated_at', 'project']
        read_only_fields = ['id', 'created_at', 'updated_at']