// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout(); // Llama a la función de logout 
    navigate('/login'); // Redirige al login después de cerrar sesión
  };

  return (
    <nav style={{
      backgroundColor: '#333',
      padding: '15px 20px',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5em', fontWeight: 'bold' }}>
        Focus & Draft
      </Link>
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          padding: '8px 15px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '0.9em'
        }}
      >
        Cerrar Sesión
      </button>
    </nav>
  );
}

export default Navbar;