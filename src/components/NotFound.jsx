import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background-light dark:bg-background-dark text-center px-4">
      <div className="max-w-md">
        <h1 className="text-9xl font-extrabold text-primary">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mt-4">Página no encontrada</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-4 mb-8">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link
          to="/"
          className="inline-block bg-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-primary-dark transition-colors"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
