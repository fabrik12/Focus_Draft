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
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Añadir nueva tarea..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ flexGrow: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
      />
      <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Añadir Tarea
      </button>
      {error && <p style={{ color: 'red', marginTop: '5px', width: '100%' }}>{error}</p>}
    </form>
  );
}

export default TaskForm;