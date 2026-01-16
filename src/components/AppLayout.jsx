import React from 'react';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">La Púrpura - App</h1>
      </header>
      <main className="flex-1 p-4 bg-background-light dark:bg-background-dark">
        {/* El contenido de las rutas anidadas se renderizará aquí */}
        <Outlet />
      </main>
      <footer className="bg-gray-200 dark:bg-gray-800 p-4 text-center text-sm text-gray-600 dark:text-gray-400">
        © 2024 La Púrpura
      </footer>
    </div>
  );
};

export default AppLayout;
