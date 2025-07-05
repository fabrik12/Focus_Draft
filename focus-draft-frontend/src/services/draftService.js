// src/services/draftService.js
import api from './api'; // Importa la instancia de Axios configurada

const draftService = {
    // Obtener todos los borradores del usuario
    getDrafts: async () => {
        try {
            const response = await api.get('drafts/');
            return response.data;
        } catch (error) {
            console.error('Error al obtener borradores:', error.response ? error.response.data : error.message);
            throw error;
        }
    },

    // Obtener un borrador específico por ID
    getDraftById: async (id) => {
        try {
            const response = await api.get(`drafts/${id}/`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener borrador ${id}:`, error.response ? error.response.data : error.message);
            throw error;
        }
    },

    // Crear un nuevo borrador
    createDraft: async (title, content = '', project = null) => {
        try {
            const response = await api.post('drafts/', { title, content, project });
            return response.data;
        } catch (error) {
            console.error('Error al crear borrador:', error.response ? error.response.data : error.message);
            throw error;
        }
    },

    // Actualizar un borrador existente
    updateDraft: async (id, data) => {
        try {
            const response = await api.put(`drafts/${id}/`, data);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar borrador ${id}:`, error.response ? error.response.data : error.message);
            throw error;
        }
    },

    // Eliminar un borrador
    deleteDraft: async (id) => {
        try {
            await api.delete(`drafts/${id}/`);
            return { message: 'Borrador eliminado exitosamente' };
        } catch (error) {
            console.error(`Error al eliminar borrador ${id}:`, error.response ? error.response.data : error.message);
            throw error;
        }
    },
};

export default draftService;