# focus_draft_backend/api/urls.py

from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import (
    RegisterView,
    TaskListCreateView,
    TaskDetailView,
    DraftListCreateView,
    DraftDetailView,
    PomodoroSessionListCreateView,
    PomodoroSessionTodayCountView,
)

urlpatterns = [
    # Endpoints de Autenticación
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Endpoints para Tareas
    path('tasks/', TaskListCreateView.as_view(), name='task_list_create'), # GET (listar), POST (crear)
    path('tasks/<int:pk>/', TaskDetailView.as_view(), name='task_detail'), # GET (detalle), PUT (actualizar), DELETE (eliminar)

    # Endpoints para Borradores
    path('drafts/', DraftListCreateView.as_view(), name='draft_list_create'), # GET (listar), POST (crear)
    path('drafts/<int:pk>/', DraftDetailView.as_view(), name='draft_detail'), # GET (detalle), PUT (actualizar), DELETE (eliminar)

    # Endpoints para Sesiones Pomodoro 
    path('pomodoro/sessions/', PomodoroSessionListCreateView.as_view(), name='pomodoro_session_list_create'), # GET (listar), POST (crear)
    path('pomodoro/sessions/today/', PomodoroSessionTodayCountView.as_view(), name='pomodoro_session_today_count'), # GET (conteo de hoy)
]
