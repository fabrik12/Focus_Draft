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
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#243647] px-10 py-3 bg-[#111a22]">
      <div className="flex items-center gap-4 text-white">
        {/* Logo - Usaremos un SVG simple o un texto por ahora */}
        <div className="size-4">
          {/* Aquí podrías insertar el SVG del logo de tu HTML o un icono */}
          {/* Por simplicidad, usaremos un cuadrado de color por ahora */}
          <div className="size-full bg-blue-500 rounded-sm"></div>
        </div>
        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Focus & Draft</h2> {/* Nombre del proyecto */}
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          {/* Elementos de navegación del TDD - Ajustados a nuestras vistas */}
          <Link to="/dashboard" className="text-white text-sm font-medium leading-normal">Dashboard</Link>
          {/* El TDD menciona "Projects", "Library", "Collaborations" como fuera de alcance en el MVP actual
              Pero si quieres placeholders para el futuro, podríamos ponerlos comentados o como enlaces dummy.
              Por ahora, nos centramos en las funcionalidades del MVP. */}
          {/* <a className="text-white text-sm font-medium leading-normal" href="#">Projects</a> */}
        </div>
        {/* Botón de Notificaciones (ejemplo de tu diseño, sin funcionalidad por ahora) */}
        <button
          className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#243647] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
        >
          <div className="text-white size-5"> {/* Icono de campana - placeholder */}
             {/* Aquí iría el SVG de la campana */}
             <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
               <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
             </svg>
          </div>
        </button>
        {/* Imagen de Perfil (placeholder) */}
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 bg-gray-500" // bg-gray-500 como placeholder
          // style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDU6mxgF4eI8GCRH60JBjUn-0Er1AdXCQqTm64bqM9zLZIZDbmWKHhAsIvu9pKmLSKlVTuzwzEWheeGLj_ooH8nfseP3bc8WkawZpx6Qnr4glW6QGUIqw54axXVoXfa_tjI06EcUZc4R0ErC4sn0PiqOSOlYuhkHZ2GKhWhRD7XO0naw383VA9Net51bchhMgkfcOPJNR3nL4hE0QeAoiKQI2m39rFa5yzLZo09_Omu968k_AOBNo_KzoQ-xLlt357bO6BBumYb76xR")' }} // Si quieres una imagen real
        ></div>
        {/* Botón de Cerrar Sesión con los estilos adaptados */}
        <button
          onClick={handleLogout}
          className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#dc3545] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
        >
          <span className="truncate">Cerrar Sesión</span>
        </button>
      </div>
    </header>
  );

}

export default Navbar;