// src/components/TasksModule.jsx
import React, { useState, useEffect, useCallback } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import taskService from '../services/taskService'; // Importa el servicio de tareas

function TasksModule() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await taskService.getTasks();
      setTasks(data);
      setError('');
    } catch (err) {
      console.error('Error al cargar tareas:', err);
      setError('No se pudieron cargar las tareas. Inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = async (description) => {
    try {
      const newTask = await taskService.createTask(description);
      setTasks((prevTasks) => [newTask, ...prevTasks]); // Añadir la nueva tarea al principio
      setError('');
    } catch (err) {
      console.error('Error al añadir tarea:', err);
      setError('No se pudo añadir la tarea.');
    }
  };

  const handleToggleComplete = async (taskId, isCompleted) => {
    try {
      // Optimistic update: actualiza la UI antes de la respuesta del servidor
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, is_completed: isCompleted } : task
        )
      );
      await taskService.updateTask(taskId, { is_completed: isCompleted });
      setError('');
    } catch (err) {
      console.error('Error al actualizar tarea:', err);
      setError('No se pudo actualizar el estado de la tarea.');
      // Revertir optimistic update si falla (opcional, para mayor robustez)
      fetchTasks(); // Refrescar la lista de tareas
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      // Optimistic update
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      await taskService.deleteTask(taskId);
      setError('');
    } catch (err) {
      console.error('Error al eliminar tarea:', err);
      setError('No se pudo eliminar la tarea.');
      // Revertir optimistic update si falla
      fetchTasks(); // Refrescar la lista de tareas
    }
  };

  if (loading) {
    return <p>Cargando tareas...</p>;
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#fff' }}>
      <h3>Módulo de Tareas</h3>
      {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
      <TaskForm onTaskAdded={handleAddTask} />
      <TaskList
        tasks={tasks}
        onToggleComplete={handleToggleComplete}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}

export default TasksModule;