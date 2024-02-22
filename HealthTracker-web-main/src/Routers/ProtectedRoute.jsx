import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../Routers/UserProvider';

export function ProtectedRoute({ children }) {
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.userId) {
      // Si no hay un userId en el contexto del usuario, redirige a la página de inicio
      navigate("/", { replace: true });
    }
  }, [user, navigate]); // Asegúrate de incluir dependencias adecuadas

  return user.userId ? children : null;
}

