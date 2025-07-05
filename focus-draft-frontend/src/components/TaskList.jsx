// src/components/TaskList.jsx
import React from 'react';

function TaskList({ tasks, onToggleComplete, onDeleteTask }) {
  if (!tasks || tasks.length === 0) {
    // Aseguramos que el color de texto sea claro y esté dentro del contexto de la lista
    return <p className="text-[#93adc8] text-base px-4 py-3">No hay tareas en esta sección.</p>;
  }

  return (
    <ul className="flex flex-col gap-0"> {/* Reemplaza el ul anterior */}
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center gap-4 bg-[#111a22] px-4 min-h-14 justify-between">
          <p
            className={`text-white text-base font-normal leading-normal flex-1 truncate cursor-pointer ${task.is_completed ? 'line-through text-[#93adc8]' : ''}`}
            onClick={() => onToggleComplete(task.id, !task.is_completed)}
          >
            {task.description}
          </p>
          <div className="shrink-0 flex items-center gap-2"> {/* Agregado gap-2 para botón eliminar */}
            <div className="relative flex size-7 items-center justify-center">
                <input
                type="checkbox"
                checked={task.is_completed}
                onChange={() => onToggleComplete(task.id, !task.is_completed)}
                // Clases para el checkbox: elimina apariencia nativa, define tamaño, bordes y colores
                className="appearance-none h-5 w-5 rounded border-2 border-[#344d65] bg-[#1a2632] checked:bg-[#197fe5] checked:border-[#197fe5] focus:outline-none focus:ring-0 cursor-pointer"
                />
                {task.is_completed && (
                // SVG del "tick" que se muestra solo cuando el checkbox está marcado
                <svg className="h-4 w-4 fill-white absolute pointer-events-none" viewBox="0 0 16 16">
                    <path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"/>
                </svg>
                )}
            </div>
            {/* Botón de eliminar (del esqueleto funcional) */}
            <button
              onClick={() => onDeleteTask(task.id)}
              className="text-[#f44336] hover:text-red-700 p-1 rounded" // Estilos Tailwind para un botón de texto
            >
              {/* Icono de X o Trash can si lo tienes */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16H48V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM192,208H64V64H192V208Zm-80-48V112a8,8,0,0,1,16,0v48a8,8,0,0,1-16,0Zm48,0V112a8,8,0,0,1,16,0v48a8,8,0,0,1-16,0Z"></path></svg>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;