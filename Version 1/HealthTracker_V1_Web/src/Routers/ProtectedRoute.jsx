import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../Routers/UserProvider'; // Asegúrate de que la ruta de importación es correcta

export const ProtectedRoute = ({ children, roles }) => { // Añade export aquí
  const { user } = useUserContext();

  if (!roles.includes(user.role)) {
    // Si el usuario no tiene uno de los roles requeridos, redirigir
    return <Navigate to="/" />;
  }

  return children; // Si el usuario tiene el rol correcto, permitir acceso
};
