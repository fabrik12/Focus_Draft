// src/components/TaskForm.jsx
import React, { useState } from 'react';

function TaskForm({ onTaskAdded }) {
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setError('La descripción de la tarea no puede estar vacía.');
      return;
    }
    setError('');
    onTaskAdded(description); // Llama a la función padre para añadir la tarea
    setDescription(''); // Limpia el input
  };

  return (
    <label className="flex flex-col min-w-40 flex-1">
      <input
        placeholder="Add a new task"
        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#344d65] bg-[#1a2632] focus:border-[#344d65] h-14 placeholder:text-[#93adc8] p-[15px] text-base font-normal leading-normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onKeyDown={(e) => { // Permitir añadir con Enter
          if (e.key === 'Enter') {
            handleSubmit(e);
          }
        }}
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {/* El botón de "Añadir Tarea" se omite aquí porque el diseño parece usar solo el input para añadir */}
      {/* Si quieres un botón, puedes añadirlo dentro de este label o en TaskModule */}
    </label>
  );
}

export default TaskForm;