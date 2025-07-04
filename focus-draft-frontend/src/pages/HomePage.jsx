// src/pages/HomePage.jsx
import React from 'react';

function HomePage() {
  return (
    <div>
      <h1>Bienvenido a Focus & Draft</h1>
      <p>Una herramienta para superar el bloqueo al escribir y la procrastinación.</p>
      <nav>
        <a href="/login">Iniciar Sesión</a> | <a href="/register">Registrarse</a>
      </nav>
    </div>
  );
}

export default HomePage;