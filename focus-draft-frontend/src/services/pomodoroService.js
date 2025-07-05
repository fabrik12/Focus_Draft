// src/services/pomodoroService.js
import api from './api'; // Importa la instancia de Axios configurada

const pomodoroService = {
    // Registrar una sesión de Pomodoro completada
    recordSession: async () => {
        try {
            const response = await api.post('pomodoro/sessions/');
            return response.data;
        } catch (error) {
            console.error('Error al registrar sesión Pomodoro:', error.response ? error.response.data : error.message);
            throw error;
        }
    },

    // Obtener el conteo de sesiones Pomodoro del día actual
    getTodaySessionsCount: async () => {
        try {
            const response = await api.get('pomodoro/sessions/today/');
            return response.data.count; // El backend devuelve {"count": X}
        } catch (error) {
            console.error('Error al obtener conteo de sesiones Pomodoro del día:', error.response ? error.response.data : error.message);
            throw error;
        }
    },
};

export default pomodoroService;