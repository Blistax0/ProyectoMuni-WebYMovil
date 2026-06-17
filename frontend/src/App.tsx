import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './core/theme/variables.css';

/* Auth & Guards */
import { AuthProvider } from './features/auth/domain/AuthContext';
import ProtectedRoute from './core/router/guards/ProtectedRoute';
import PublicRoute from './core/router/guards/PublicRoute';

/* Páginas Públicas (PC) */
import Login from './features/auth/presentation/screens/Login/Login';
import Register from './features/auth/presentation/screens/Register/Register';
import ResetPassword from './features/auth/presentation/screens/ResetPassword/ResetPassword';

/* Páginas Públicas (Móvil) */
import LoginMovil from './features/auth/presentation/screens/Mobile/LoginMovil';
import RegistroMovil from './features/auth/presentation/screens/Mobile/RegistroMovil';

/* Páginas Protegidas (PC) */
import Dashboard from './features/dashboard/presentation/screens/Dashboard/Dashboard';
import GeoFencingPage from './features/geofencing/presentation/screens/GeoFencing/GeoFencingPage';
import RouteHistoryPage from './features/tracking/presentation/screens/RouteHistory/RouteHistoryPage';
import IncidentManagementPage from './features/incidents/presentation/screens/IncidentManagement/IncidentManagementPage';

/* Pantalla Táctica (Móvil) */
import Monitor from './features/auth/presentation/screens/Monitor/Monitor';

setupIonicReact();

const App: React.FC = () => (
  <AuthProvider>
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>

          {/* Rutas Públicas de PC */}
          <Route exact path="/login">
            <PublicRoute><Login /></PublicRoute>
          </Route>

          <Route exact path="/register">
            <PublicRoute><Register /></PublicRoute>
          </Route>

          <Route exact path="/reset-password">
            <PublicRoute><ResetPassword /></PublicRoute>
          </Route>

          {/* Rutas Públicas de Celular */}
          <Route exact path="/app/login">
            <PublicRoute><LoginMovil /></PublicRoute>
          </Route>

          <Route exact path="/app/register">
            <PublicRoute><RegistroMovil /></PublicRoute>
          </Route>

          {/* Rutas Protegidas */}
          <Route exact path="/monitor">
            <ProtectedRoute allowedRoles={['ADMIN', 'PATRULLERO']}>
              <Monitor />
            </ProtectedRoute>
          </Route>

          <Route exact path="/dashboard">
            <ProtectedRoute allowedRoles={['ADMIN', 'PATRULLERO']}>
              <Dashboard />
            </ProtectedRoute>
          </Route>

          <Route exact path="/geofencing">
            <ProtectedRoute allowedRoles={['ADMIN', 'PATRULLERO']}>
              <GeoFencingPage />
            </ProtectedRoute>
          </Route>

          <Route exact path="/history">
            <ProtectedRoute allowedRoles={['ADMIN', 'PATRULLERO']}>
              <RouteHistoryPage />
            </ProtectedRoute>
          </Route>

          <Route exact path="/incidents">
            <ProtectedRoute allowedRoles={['ADMIN', 'PATRULLERO']}>
              <IncidentManagementPage />
            </ProtectedRoute>
          </Route>

          {/* Redirección raíz */}
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>

        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </AuthProvider>
);

export default App;