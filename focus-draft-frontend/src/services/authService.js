// src/services/authService.js
import api from './api'; // Importa la instancia de Axios configurada

const authService = {
    register: async (username, email, password) => {
        try {
            const response = await api.post('auth/register/', { username, email, password });
            return response.data;
        } catch (error) {
            console.error('Error en el registro:', error.response ? error.response.data : error.message);
            throw error; // Propaga el error para que la UI pueda manejarlo
        }
    },

    login: async (username, password) => {
        try {
            const response = await api.post('auth/login/', { username, password });
            const { access, refresh } = response.data;

            // Almacenar los tokens en localStorage
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);

            return response.data; // Devuelve los datos (incluidos los tokens)
        } catch (error) {
            console.error('Error en el inicio de sesión:', error.response ? error.response.data : error.message);
            throw error;
        }
    },

    logout: () => {
        // Eliminar los tokens de localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        console.log('Sesión cerrada. Tokens eliminados.');
    },

    getCurrentUser: () => {
        // Implementar lógica para decodificar JWT y obtener información del usuario si es necesario
        // Por ahora, solo verificaremos si hay un token de acceso
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            // Decodificar el token para obtener información del usuario (ej. userId, username)
            const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
            return decodedToken;
            //return { isAuthenticated: true }; // Placeholder
        }
        return null;
    },

    isAuthenticated: () => {
        const accessToken = localStorage.getItem('access_token');
        return !!accessToken; // Devuelve true si hay un token de acceso, false en caso contrario
    }
};

export default authService;