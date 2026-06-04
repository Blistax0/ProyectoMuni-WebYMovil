import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; 
}

/**
 * ProtectedRoute — Protege el contenido basado en la sesión y roles.
 * Retorna directamente el contenido o un Redirect, compatible con Ionic.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles
}) => {
  const { isAuthenticated, role } = useAuth();

  // 1. Si no está logueado, al Login de una
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  // 2. Si la ruta pide roles específicos y el usuario no lo tiene, lo rebotamos
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    // Si es patrullero y trata de entrar a algo de admin, lo mandamos a incidentes (o viceversa)
    return <Redirect to={role === 'PATRULLERO' ? '/incidents' : '/dashboard'} />; 
  }

  // 3. Si todo está en orden, renderiza los hijos
  return <>{children}</>;
};

export default ProtectedRoute;
