// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importa tus componentes de página
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import DraftEditorPage from './pages/DraftEditorPage';

function App() {
  // Aquí, más adelante, manejaremos el estado de autenticación para rutas protegidas
  // const isAuthenticated = false; // Placeholder: Esto vendrá de tu contexto de autenticación

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rutas Protegidas (ej. requieren autenticación) */}
        {/* Por ahora, las haremos accesibles para probar el enrutamiento.
            Más adelante, se añadirán redirecciones si el usuario no está autenticado. */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/drafts/:id" element={<DraftEditorPage />} /> {/* :id para editar un borrador específico */}
        <Route path="/drafts/new" element={<DraftEditorPage />} /> {/* Para crear un nuevo borrador */}

        {/* Ruta por defecto para 404s o redirección a home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
