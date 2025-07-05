// src/hooks/usePomodoroTimer.js
import { useState, useEffect, useRef, useCallback } from 'react';

const WORK_TIME_SECONDS = 25 * 60; // 25 minutos
const BREAK_TIME_SECONDS = 5 * 60;  // 5 minutos

function usePomodoroTimer() {
    const [timeLeft, setTimeLeft] = useState(WORK_TIME_SECONDS);
    const [isRunning, setIsRunning] = useState(false);
    const [isWorkSession, setIsWorkSession] = useState(true); // true: trabajo, false: descanso
    const [sessionsCompleted, setSessionsCompleted] = useState(0); // Contador local de sesiones completadas
    const intervalRef = useRef(null); // Para almacenar el ID del intervalo
    const [statusMessage, setStatusMessage] = useState('Listo para trabajar');

    const startTimer = useCallback(() => {
        if (!isRunning) {
            setIsRunning(true);
            setStatusMessage(isWorkSession ? '¡Trabajando duro!' : '¡Tomando un descanso!');
            intervalRef.current = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        // El tiempo ha terminado
                        clearInterval(intervalRef.current);
                        setIsRunning(false);

                        if (isWorkSession) {
                            // Sesión de trabajo terminada
                            setStatusMessage('Sesión de trabajo completada. ¡Es hora de un descanso!');
                            setSessionsCompleted((prev) => prev + 1); // Incrementa el contador local
                            return BREAK_TIME_SECONDS; // Pasa al tiempo de descanso
                        } else {
                            // Sesión de descanso terminada
                            setStatusMessage('Descanso terminado. ¡Listo para la próxima sesión de trabajo!');
                            return WORK_TIME_SECONDS; // Pasa al tiempo de trabajo
                        }
                    }
                    return prevTime - 1;
                });
            }, 1000); // Actualiza cada segundo
        }
    }, [isRunning, isWorkSession]);

    const pauseTimer = useCallback(() => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setStatusMessage(isWorkSession ? 'Pausado (Trabajo)' : 'Pausado (Descanso)');
    }, [isRunning, isWorkSession]);

    const resetTimer = useCallback(() => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setIsWorkSession(true);
        setTimeLeft(WORK_TIME_SECONDS);
        setStatusMessage('Temporizador reiniciado');
    }, []);

    const toggleSessionType = useCallback(() => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setIsWorkSession((prev) => !prev);
        setTimeLeft(isWorkSession ? BREAK_TIME_SECONDS : WORK_TIME_SECONDS); // Cambia el tiempo según el tipo de sesión
        setStatusMessage(isWorkSession ? 'Cambiado a descanso' : 'Cambiado a trabajo');
    }, [isWorkSession]);


    useEffect(() => {
        // Lógica para cambiar de sesión de trabajo a descanso y viceversa cuando el tiempo llega a 0
        if (!isRunning && timeLeft === 0) {
            setIsWorkSession((prev) => !prev);
            setTimeLeft(isWorkSession ? WORK_TIME_SECONDS : BREAK_TIME_SECONDS); // Establece el tiempo para la nueva sesión
        }
    }, [isRunning, timeLeft, isWorkSession]);


    // Limpiar el intervalo cuando el componente se desmonte
    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return {
        timeLeft,
        isRunning,
        isWorkSession,
        sessionsCompleted,
        statusMessage,
        formatTime,
        startTimer,
        pauseTimer,
        resetTimer,
        toggleSessionType,
        setSessionsCompleted, // Expone el setter para actualizar desde el módulo principal
    };
}

export default usePomodoroTimer;