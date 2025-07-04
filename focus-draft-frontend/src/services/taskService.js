// src/services/taskService.js
import api from './api'; // Importa la instancia de Axios configurada

const taskService = {
    // Obtener todas las tareas del usuario
    getTasks: async () => {
        try {
            const response = await api.get('tasks/');
            return response.data;
        } catch (error) {
            console.error('Error al obtener tareas:', error.response ? error.response.data : error.message);
            throw error;
        }
    },

    // Crear una nueva tarea
    createTask: async (description, project = null) => {
        try {
            const response = await api.post('tasks/', { description, project });
            return response.data;
        } catch (error) {
            console.error('Error al crear tarea:', error.response ? error.response.data : error.message);
            throw error;
        }
    },

    // Actualizar una tarea (ej. marcar como completada)
    updateTask: async (id, data) => {
        try {
            const response = await api.put(`tasks/${id}/`, data);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar tarea:', error.response ? error.response.data : error.message);
            throw error;
        }
    },

    // Eliminar una tarea
    deleteTask: async (id) => {
        try {
            await api.delete(`tasks/${id}/`);
            return { message: 'Tarea eliminada exitosamente' };
        } catch (error) {
            console.error('Error al eliminar tarea:', error.response ? error.response.data : error.message);
            throw error;
        }
    },
};

export default taskService;