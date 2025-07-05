// src/pages/DashboardPage.jsx
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import Navbar from '../components/Navbar';
import TasksModule from '../components/TaskModule';
import DraftsListModule from '../components/DraftListModule';
import PomodoroModule from '../components/PomodoroModule';

function DashboardPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login'); //Redirigir al Login
    }
  }, [navigate]);

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#111a22] dark group/design-root overflow-x-hidden">
      <Navbar /> {/* Tu Navbar ya adaptado */}

      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          {/* Columna Izquierda: Today's Plan (Tareas) */}
          <div className="layout-content-container flex flex-col w-80">
            <h2 className="text-white tracking-light text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-5">
              Today's Plan
            </h2>
            {/* Aquí renderizamos el TasksModule. Sus estilos internos ya tienen sus propios divs de sección */}
            <TasksModule />
          </div>

          {/* Columna Derecha: Focus Mode (Pomodoro) y Start Writing (Borradores) */}
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Módulo Pomodoro */}
            <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Focus Mode
            </h3>
            {/* Aquí renderizamos el PomodoroModule. Sus estilos internos ya tienen sus propios divs de sección */}
            <PomodoroModule />

            {/* Módulo Borradores */}
            <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4 mt-6"> {/* Añadido mt-6 para espacio */}
              Start Writing
            </h3>
            {/* Aquí renderizamos el DraftsListModule. Sus estilos internos ya tienen sus propios divs de sección */}
            <DraftsListModule />
          </div>
        </div>
      </div>
      {/* Opcional: Un footer global si lo deseas aquí, o dejarlo implícito por el fondo oscuro */}
    </div>
  );
}

export default DashboardPage;