// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/'; // URL base del API de Django

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para añadir el token de acceso a cada solicitud
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('access_token'); // Donde se almacena actualmente
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejar errores de respuesta (ej. 401 Unauthorized)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        // Si el error es 401 y no es la solicitud de refresco en sí
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Marca la solicitud para que no intente de nuevo infinitamente
            try {
                const refreshToken = localStorage.getItem('refresh_token');
                if (!refreshToken) {
                    // No hay token de refresco, redirigir al login
                    console.log('No refresh token available. Redirecting to login.');
                    //Redirigir al Login
                    window.location.href = '/login';
                    return Promise.reject(error);
                }

                // Realiza la solicitud para refrescar el token
                const response = await axios.post(`${API_BASE_URL}auth/token/refresh/`, {
                    refresh: refreshToken,
                });

                const { access: newAccessToken, refresh: newRefreshToken } = response.data;

                // Almacena los nuevos tokens
                localStorage.setItem('access_token', newAccessToken);
                localStorage.setItem('refresh_token', newRefreshToken);

                // Actualiza el token en la cabecera de la solicitud original y reinténtala
                api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return api(originalRequest); // Reintenta la solicitud original
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
                // Si el refresco falla (ej. refresh token inválido/expirado), redirigir al login
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                //Redirigir al Login
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;