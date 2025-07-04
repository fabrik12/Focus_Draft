// src/pages/DashboardPage.jsx
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import Navbar from '../components/Navbar';

function DashboardPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login'); //Redirigir al Login
    }
  }, [navigate]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f4f7f6' }}>
      <Navbar /> {/* Incluye la barra de navegación */}
      <main style={{ flexGrow: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h2>Tu Tablero Personal</h2>

        {/* Área para el Módulo de Tareas */}
        <section style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3>Módulo de Tareas</h3>
          <p>Aquí se listarán y gestionarán tus micro-objetivos.</p>
          {/* <TasksModule /> */}
        </section>

        {/* Área para el Módulo de Borradores */}
        <section style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3>Módulo de Borradores</h3>
          <p>Accede a tus borradores y al editor de escritura libre.</p>
          <Link to="/drafts/new" style={{ textDecoration: 'none', backgroundColor: '#007bff', color: 'white', padding: '8px 12px', borderRadius: '5px' }}>
            Nuevo Borrador
          </Link>
          {/* <DraftsListModule /> */}
        </section>

        {/* Área para el Módulo Pomodoro */}
        <section style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3>Módulo de Enfoque (Pomodoro)</h3>
          <p>Controla tus sesiones de trabajo concentrado.</p>
          {/* <PomodoroModule /> */}
        </section>

        {/* Puedes añadir un footer simple si lo deseas */}
        <footer style={{ textAlign: 'center', padding: '20px', color: '#666', fontSize: '0.8em', marginTop: 'auto' }}>
          &copy; {new Date().getFullYear()} Focus & Draft. Todos los derechos reservados.
        </footer>
      </main>
    </div>
  );
}

export default DashboardPage;