import React, { createContext, useState, useContext } from 'react';

// 1. Crear el Contexto
const AuthContext = createContext(null);

// 2. Crear el Proveedor del Contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Almacena el objeto de usuario (ej. { email, role })

  // Función para simular el inicio de sesión
  const login = (email) => {
    // Simulación simple de roles: si el email contiene 'admin', es admin.
    const role = email.includes('admin') ? 'admin' : 'user';
    setUser({ email, role });
    // En una app real, aquí se guardaría un token (ej. en localStorage)
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    // En una app real, aquí se eliminaría el token.
  };

  const value = {
    user,
    isLoggedIn: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Crear un Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
