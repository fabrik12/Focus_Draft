// src/components/DraftsListModule.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import draftService from '../services/draftService';

function DraftsListModule() {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newDraftTitle, setNewDraftTitle] = useState(''); // Para un campo de añadir rápido

  const fetchDrafts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await draftService.getDrafts();
      // Ordenar por fecha de actualización, los más recientes primero
      setDrafts(data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)));
      setError('');
    } catch (err) {
      console.error('Error al cargar borradores:', err);
      setError('No se pudieron cargar los borradores. Inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDrafts();
  }, [fetchDrafts]);

  const handleCreateNewDraft = async (e) => {
    e.preventDefault();
    if (!newDraftTitle.trim()) {
        setError('El título del borrador no puede estar vacío.');
        return;
    }
    try {
        const newDraft = await draftService.createDraft(newDraftTitle.trim());
        setDrafts((prevDrafts) => [newDraft, ...prevDrafts].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)));
        setNewDraftTitle('');
        setError('');
        // Opcional: Podrías redirigir directamente al editor del nuevo borrador
        // navigate(`/drafts/${newDraft.id}`);
    } catch (err) {
        console.error('Error al crear borrador:', err);
        setError('No se pudo crear el borrador.');
    }
  };

  const handleDeleteDraft = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este borrador?')) {
      try {
        await draftService.deleteDraft(id);
        setDrafts((prevDrafts) => prevDrafts.filter((draft) => draft.id !== id));
        setError('');
      } catch (err) {
        console.error('Error al eliminar borrador:', err);
        setError('No se pudo eliminar el borrador.');
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  if (loading) {
    return <p className="text-white px-4">Cargando borradores...</p>;
  }

  return (
    <div className="flex flex-col flex-1"> {/* Contenedor principal del módulo de borradores */}
      {error && <p className="text-red-500 px-4 mb-4">{error}</p>}

      <div className="flex px-4 py-3 justify-start"> {/* Contenedor para el botón/input de nuevo borrador */}
          {/* Aquí se adapta el input para crear nuevo borrador */}
          <input
            type="text"
            placeholder="Título del nuevo borrador..."
            value={newDraftTitle}
            onChange={(e) => setNewDraftTitle(e.target.value)}
            onKeyDown={(e) => { // Permitir añadir con Enter
              if (e.key === 'Enter') {
                handleCreateNewDraft(e);
              }
            }}
            className="form-input flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#344d65] bg-[#1a2632] focus:border-[#344d65] h-10 placeholder:text-[#93adc8] p-[15px] text-base font-normal leading-normal min-w-[200px]"
            required
          />
          <button
            onClick={handleCreateNewDraft}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#197fe5] text-white text-sm font-bold leading-normal tracking-[0.015em] ml-2"
          >
            <span className="truncate">Crear Borrador</span>
          </button>
      </div>

      {drafts.length === 0 ? (
        <p className="text-[#93adc8] text-base px-4 py-3">No hay borradores. ¡Crea uno nuevo para empezar a escribir!</p>
      ) : (
        <ul className="flex flex-col gap-0"> {/* Lista de borradores */}
          {drafts.map((draft) => (
            <li key={draft.id} className="flex items-center gap-4 bg-[#111a22] px-4 min-h-[72px] py-2 justify-between border-b border-solid border-b-[#243647]">
              <Link to={`/drafts/${draft.id}`} className="flex flex-col justify-center flex-grow">
                <p className="text-white text-base font-medium leading-normal line-clamp-1">{draft.title}</p>
                <p className="text-[#93adc8] text-sm font-normal leading-normal line-clamp-2">
                  Última edición: {formatDate(draft.updated_at)}
                </p>
              </Link>
              <div className="shrink-0 flex items-center gap-2">
                {/* Icono de lápiz (editar) - de tu diseño */}
                <div className="text-white flex size-7 items-center justify-center" data-icon="PencilSimple" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
                  </svg>
                </div>
                {/* Botón de eliminar (similar al de tareas, con icono de papelera) */}
                <button
                  onClick={() => handleDeleteDraft(draft.id)}
                  className="text-[#f44336] hover:text-red-700 p-1 rounded"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16H48V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM192,208H64V64H192V208Zm-80-48V112a8,8,0,0,1,16,0v48a8,8,0,0,1-16,0Zm48,0V112a8,8,0,0,1,16,0v48a8,8,0,0,1-16,0Z"></path></svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DraftsListModule;