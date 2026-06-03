import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

//Actualizamos la interfaz para que acepte allowedRoles
interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  allowedRoles?: string[]; 
}

/**
 * ProtectedRoute — Ruta protegida por autenticación y roles.
 * Si el usuario NO tiene sesión activa, redirige a /login.
 * Si SÍ tiene sesión pero no el rol adecuado, lo redirige condicionalmente.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  component: Component, 
  allowedRoles, 
  ...rest 
}) => {
  const { isAuthenticated, role } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        // 1. Si no está logueado, al Login de una
        if (!isAuthenticated) {
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
        }

        // 2. Si la ruta pide roles específicos y el usuario no lo tiene, lo rebotamos
        if (allowedRoles && role && !allowedRoles.includes(role)) {
          // Si es patrullero y trata de entrar a algo de admin, lo mandamos a incidentes (o viceversa)
          return <Redirect to={role === 'PATRULLERO' ? '/incidents' : '/dashboard'} />; 
        }

        // 3. Si todo está en orden, renderiza la pantalla normalmente
        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
