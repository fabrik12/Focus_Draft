# focus_draft_backend/api/models.py

from django.db import models
from django.contrib.auth.models import User 

# El modelo User de Django ya cubre 'id', 'email', 'password', 'created_at' (implícito en User)
# El campo 'email' es único en el modelo User, y el 'password' es hasheado.

class Project(models.Model):
    """
    Modelo para representar un proyecto de investigación.
    Corresponde a la tabla 'projects' del TDD. [cite: 47]
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE) # Relación con el usuario que creó el proyecto
    name = models.CharField(max_length=255) # Nombre del proyecto 
    description = models.TextField(blank=True, null=True) # Descripción del proyecto (opcional)
    created_at = models.DateTimeField(auto_now_add=True) # Fecha y hora de creación 

    def __str__(self):
        return self.name

    class Meta:
        # Añadir índice para user_id si es necesario para optimización de consultas
        indexes = [
            models.Index(fields=['user']),
        ]


class Task(models.Model):
    """
    Modelo para representar una tarea dentro de un proyecto o de forma independiente.
    Corresponde a la tabla 'tasks' del TDD. 
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE) # Relación con el usuario 
    project = models.ForeignKey(
        Project,
        on_delete=models.SET_NULL, # Si el proyecto se elimina, la tarea no se borra, solo se desvincula
        null=True,
        blank=True
    )
    description = models.TextField() # Descripción de la tarea
    is_completed = models.BooleanField(default=False) # Estado de la tarea (completada o no)
    created_at = models.DateTimeField(auto_now_add=True) # Fecha y hora de creación

    def __str__(self):
        return f"Tarea de {self.user.username}: {self.description[:50]}"

    class Meta:
        # Añadir índices para user_id y project_id
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['project']),
        ]


class Draft(models.Model):
    """
    Modelo para representar un borrador de escritura libre ("borrador basura").
    Corresponde a la tabla 'drafts' del TDD. [cite: 60]
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE) # Relación con el usuario
    project = models.ForeignKey(
        Project,
        on_delete=models.SET_NULL, # Si el proyecto se elimina, el borrador no se borra
        null=True,
        blank=True
    )
    title = models.CharField(max_length=255) # Título del borrador
    content = models.TextField(blank=True, null=True) # Contenido del borrador (puede estar vacío al inicio)
    created_at = models.DateTimeField(auto_now_add=True) # Fecha y hora de creación
    updated_at = models.DateTimeField(auto_now=True) # Fecha y hora de la última actualización

    def __str__(self):
        return f"Borrador de {self.user.username}: {self.title}"

    class Meta:
        # Añadir índices para user_id y project_id
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['project']),
        ]


class PomodoroSession(models.Model):
    """
    Modelo para registrar sesiones de Pomodoro completadas.
    Corresponde a la tabla 'pomodoro_sessions' del TDD. [cite: 69]
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE) # Relación con el usuario
    completed_at = models.DateTimeField(auto_now_add=True) # Fecha y hora en que la sesión fue completada

    def __str__(self):
        return f"Sesión Pomodoro de {self.user.username} completada a las {self.completed_at.strftime('%Y-%m-%d %H:%M')}"

    class Meta:
        # Añadir índice para user_id
        indexes = [
            models.Index(fields=['user']),
        ]
        # Opcional: Para consultas de sesiones diarias, se podrías considerar un índice en completed_at
        # indexes.append(models.Index(fields=['completed_at'])):