// src/pages/DraftEditorPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import draftService from '../services/draftService';
import Navbar from '../components/Navbar'; // Para mantener la navegación

function DraftEditorPage() {
  const { id } = useParams(); // Obtiene el ID del borrador de la URL (si existe)
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false); // Para mostrar estado de guardado
  const [isNewDraft, setIsNewDraft] = useState(false); // Para saber si es un borrador nuevo

  // Función para cargar el borrador existente
  const fetchDraft = useCallback(async () => {
    if (id) {
      try {
        setLoading(true);
        const data = await draftService.getDraftById(id);
        setTitle(data.title);
        setContent(data.content);
        setIsNewDraft(false);
        setError('');
      } catch (err) {
        console.error(`Error al cargar borrador ${id}:`, err);
        setError('No se pudo cargar el borrador. Es posible que no exista o no tengas permisos.');
        // Aquí podrías redirigir a una página de 404 o al dashboard si el borrador no existe
        // navigate('/dashboard', { replace: true });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setIsNewDraft(true);
      setTitle('Nuevo Borrador Sin Título');
      setContent('');
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchDraft();
  }, [fetchDraft]);

  // Función para guardar o actualizar el borrador
  const handleSaveDraft = useCallback(async () => {
    // Evita guardar si no es un borrador nuevo y el título y contenido están vacíos
    if (!isNewDraft && !title.trim() && !content.trim()) {
        console.log("No hay cambios para guardar o borrador vacío no nuevo.");
        return;
    }

    setIsSaving(true);
    setError('');
    try {
      let savedDraft;
      if (isNewDraft) {
        // Asegúrate de que el título no esté vacío al crear un nuevo borrador
        const draftTitle = title.trim() || 'Borrador Sin Título';
        savedDraft = await draftService.createDraft(draftTitle, content);
        navigate(`/drafts/${savedDraft.id}`, { replace: true });
      } else {
        savedDraft = await draftService.updateDraft(id, { title: title.trim(), content });
      }
      console.log('Borrador guardado:', savedDraft);
    } catch (err) {
      console.error('Error al guardar borrador:', err);
      setError('Error al guardar el borrador.');
    } finally {
      setIsSaving(false);
    }
  }, [id, title, content, isNewDraft, navigate]);

  // Guardado automático simple cada X segundos o al escribir (debounce)
  // Implementación simple de un guardado 'al cambiar' con un pequeño retraso
  useEffect(() => {
    // Evita guardar al cargar inicialmente o si no hay cambios significativos
    if (loading || isNewDraft && !title.trim() && !content.trim()) return;

    const handler = setTimeout(() => {
      handleSaveDraft();
    }, 2000); // Guarda 2 segundos después de que el usuario deja de escribir

    return () => {
      clearTimeout(handler);
    };
  }, [title, content, handleSaveDraft, loading, isNewDraft]);


  if (loading) {
    return (
      <div className="relative flex size-full min-h-screen flex-col bg-[#111a22] dark group/design-root overflow-x-hidden">
        <Navbar />
        <div className="flex flex-1 justify-center items-center py-5">
            <p className="text-white text-lg">Cargando borrador...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#111a22] dark group/design-root overflow-x-hidden">
      <Navbar />
      <div className="layout-container flex h-full grow flex-col py-5 px-6 items-center"> {/* Centrar el editor */}
        <div className="flex flex-col max-w-[960px] flex-1 w-full bg-[#1a2632] rounded-lg shadow-lg p-6"> {/* Editor de texto */}
          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título del Borrador"
              className="flex-grow bg-transparent text-white text-[2em] font-bold border-none focus:outline-none placeholder:text-[#93adc8]"
              style={{ borderBottom: '1px solid #344d65' }} // Borde inferior del input
            />
            <div className="flex items-center gap-4 ml-4">
              {isSaving && <span className="text-[#93adc8]">Guardando...</span>}
              {error && <span className="text-red-500">Error: {error}</span>}
              <button
                onClick={handleSaveDraft}
                disabled={isSaving}
                className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#197fe5] text-white text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">{isSaving ? 'Guardando...' : 'Guardar Ahora'}</span>
              </button>
              <Link to="/dashboard" className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#243647] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Volver</span>
              </Link>
            </div>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Empieza a escribir tu borrador basura aquí..."
            className="flex-grow w-full h-full p-4 bg-transparent text-white text-base font-normal leading-relaxed resize-none focus:outline-none placeholder:text-[#93adc8]"
            style={{ minHeight: 'calc(100vh - 250px)' }} // Altura mínima adaptable
          />
        </div>
      </div>
    </div>
  );
}

export default DraftEditorPage;