// src/components/PomodoroModule.jsx
import React, { Link, useEffect, useState, useCallback } from 'react';
import usePomodoroTimer from '../hooks/usePomodoroTimer';
import pomodoroService from '../services/pomodoroService'; // Importa el servicio de Pomodoro

function PomodoroModule() {
  const {
    timeLeft,
    isRunning,
    isWorkSession,
    sessionsCompleted: localSessionsCompleted, // Renombra para evitar conflicto con el estado global
    statusMessage,
    formatTime,
    startTimer,
    pauseTimer,
    resetTimer,
    toggleSessionType,
    setSessionsCompleted: setLocalSessionsCompleted, // Para actualizar el estado local de sesiones
  } = usePomodoroTimer();

  const [backendSessionsCount, setBackendSessionsCount] = useState(0); // Sesiones completadas según el backend
  const [error, setError] = useState('');

  // Cargar sesiones completadas del backend al iniciar el componente
  const fetchTodaySessions = useCallback(async () => {
    try {
      const count = await pomodoroService.getTodaySessionsCount();
      setBackendSessionsCount(count);
      setError('');
    } catch (err) {
      console.error('Error al obtener sesiones de hoy:', err);
      setError('No se pudo cargar el conteo de sesiones de hoy.');
    }
  }, []);

  useEffect(() => {
    fetchTodaySessions();
  }, [fetchTodaySessions]);

  // Lógica para registrar una sesión en el backend cuando se completa una sesión de trabajo
  useEffect(() => {
    if (!isRunning && timeLeft === 0 && isWorkSession) {
      const recordAndFetch = async () => {
        try {
          await pomodoroService.recordSession();
          setLocalSessionsCompleted((prev) => prev + 1);
          setBackendSessionsCount((prev) => prev + 1);
          setError('');
        } catch (err) {
          console.error('Error al registrar sesión Pomodoro en el backend:', err);
          setError('No se pudo registrar la sesión completada en el servidor.');
        }
      };
      recordAndFetch();
    }
  }, [isRunning, timeLeft, isWorkSession, setLocalSessionsCompleted]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col flex-1"> {/* Contenedor principal del módulo Pomodoro */}
      {error && <p className="text-red-500 px-4 mb-4 text-center">{error}</p>}

      <div className="flex gap-4 py-6 px-4">
        {/* Horas */}
        <div className="flex grow basis-0 flex-col items-stretch gap-4">
          <div className="flex h-14 grow items-center justify-center rounded-lg px-3 bg-[#243647]">
            <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
              {hours.toString().padStart(2, '0')}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-white text-sm font-normal leading-normal">Hours</p>
          </div>
        </div>

        {/* Minutos */}
        <div className="flex grow basis-0 flex-col items-stretch gap-4">
          <div className="flex h-14 grow items-center justify-center rounded-lg px-3 bg-[#243647]">
            <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
              {minutes.toString().padStart(2, '0')}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-white text-sm font-normal leading-normal">Minutes</p>
          </div>
        </div>

        {/* Segundos */}
        <div className="flex grow basis-0 flex-col items-stretch gap-4">
          <div className="flex h-14 grow items-center justify-center rounded-lg px-3 bg-[#243647]">
            <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
              {seconds.toString().padStart(2, '0')}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-white text-sm font-normal leading-normal">Seconds</p>
          </div>
        </div>
      </div>

      <p className="text-[#93adc8] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">
         {/* Mensaje de estado, se adapta del hook */}
         {statusMessage}
      </p>

      <div className="flex justify-center">
        <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 max-w-[480px] justify-center">
          {/* Botón Start/Pause */}
          <button
            onClick={isRunning ? pauseTimer : startTimer}
            className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 text-white text-sm font-bold leading-normal tracking-[0.015em] grow
              ${isRunning ? 'bg-[#ffc107]' : 'bg-[#197fe5]'}
            `}
          >
            <span className="truncate">{isRunning ? 'Pausar' : 'Iniciar'}</span>
          </button>
          {/* Botón de Reset */}
          <button
            onClick={resetTimer}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#243647] text-white text-sm font-bold leading-normal tracking-[0.015em] grow"
          >
            <span className="truncate">Reiniciar</span>
          </button>
        </div>
      </div>

      <div className="flex px-4 py-3 justify-center">
        {/* Botón de Saltar/Cambiar Sesión */}
        <button
          onClick={toggleSessionType}
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#17a2b8] text-white text-sm font-bold leading-normal tracking-[0.015em]"
        >
          <span className="truncate">{isWorkSession ? 'Saltar a Descanso' : 'Saltar a Trabajo'}</span>
        </button>
      </div>

      <p className="text-[#93adc8] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">
        Sesiones de trabajo completadas (Hoy): **{backendSessionsCount}**
      </p>
    </div>
  );
}

export default PomodoroModule;