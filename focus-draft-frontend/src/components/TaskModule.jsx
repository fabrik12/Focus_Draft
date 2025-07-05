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
      setTasks((prevTasks) => [newTask, ...prevTasks]);
      setError('');
    } catch (err) {
      console.error('Error al añadir tarea:', err);
      setError('No se pudo añadir la tarea.');
    }
  };

  const handleToggleComplete = async (taskId, isCompleted) => {
    try {
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
      fetchTasks();
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      try {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        await taskService.deleteTask(taskId);
        setError('');
      } catch (err) {
        console.error('Error al eliminar tarea:', err);
        setError('No se pudo eliminar la tarea.');
        fetchTasks();
      }
    }
  };

 if (loading) {
    return <p className="text-white px-4">Cargando tareas...</p>;
  }

  return (
    <div className="flex flex-col flex-1">
        {error && <p className="text-red-500 px-4 mb-4">{error}</p>}
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <TaskForm onTaskAdded={handleAddTask} />
        </div>
        {/* Lista de tareas pendientes */}
        {tasks.filter(task => !task.is_completed).length === 0 ? (
        <p className="text-[#93adc8] text-base px-4 py-3">No hay tareas pendientes. ¡Añade una nueva!</p>
        ) : (
        <TaskList
            tasks={tasks.filter(task => !task.is_completed)} // Mostrar solo pendientes aquí
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
        />
        )}


        <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Completed</h3>
        {/* Lista de tareas completadas */}
        {tasks.filter(task => task.is_completed).length === 0 ? (
        <p className="text-[#93adc8] text-base px-4 py-3">No hay tareas completadas.</p>
        ) : (
        <TaskList
            tasks={tasks.filter(task => task.is_completed)} // Mostrar solo completadas aquí
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
        />
        )}
    </div>
  );
}

export default TasksModule;