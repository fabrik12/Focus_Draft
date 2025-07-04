// src/components/TaskList.jsx
import React from 'react';

function TaskList({ tasks, onToggleComplete, onDeleteTask }) {
  if (!tasks || tasks.length === 0) {
    return <p>No hay tareas. ¡Añade una nueva!</p>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tasks.map((task) => (
        <li key={task.id} style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 0',
          borderBottom: '1px solid #eee',
          textDecoration: task.is_completed ? 'line-through' : 'none',
          color: task.is_completed ? '#888' : '#333'
        }}>
          <span onClick={() => onToggleComplete(task.id, !task.is_completed)} style={{ cursor: 'pointer', flexGrow: 1 }}>
            {task.description}
          </span>
          <button
            onClick={() => onDeleteTask(task.id)}
            style={{
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '5px',
              cursor: 'pointer',
              marginLeft: '10px'
            }}
          >
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;