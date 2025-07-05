// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await authService.login(username, password);
            alert('Inicio de sesion exitoso!');
            //Tokens guardados
            navigate('/dashboard');
        } catch (err) {
            console.error('Error de inicio de sesión', err);
            if (err.response && err.response.data){
                setError(err.response.data.detail || 'Credenciales inválidas. Inténtalo de nuevo')
            } else {
                setError('Error de inicio de sesión. Inténtalo de nuevo')
            }
        }
    }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>} {/* Muestra el error */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Nombre de Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Iniciar Sesión
        </button>
      </form>
      <p style={{ marginTop: '20px', textAlign: 'center' }}>¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
    </div>
  );
}

export default LoginPage;