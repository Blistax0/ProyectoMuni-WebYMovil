import React, { Suspense, lazy } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonLoading, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* CSS e Importaciones base (se mantienen igual) */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './core/theme/variables.scss';

/* Auth & Guards */
import { AuthProvider } from './features/auth/domain/AuthContext';
import ProtectedRoute from './core/router/guards/ProtectedRoute';
import PublicRoute from './core/router/guards/PublicRoute';

<<<<<<< HEAD
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
=======
/* Páginas con Lazy Loading */
const Login = lazy(() => import('./features/auth/presentation/screens/Login/Login'));
const Register = lazy(() => import('./features/auth/presentation/screens/Register/Register'));
const ResetPassword = lazy(() => import('./features/auth/presentation/screens/ResetPassword/ResetPassword'));
const Dashboard = lazy(() => import('./features/dashboard/presentation/screens/Dashboard/Dashboard'));
const GeoFencingPage = lazy(() => import('./features/geofencing/presentation/screens/GeoFencing/GeoFencingPage'));
const RouteHistoryPage = lazy(() => import('./features/tracking/presentation/screens/RouteHistory/RouteHistoryPage'));
const IncidentManagementPage = lazy(() => import('./features/incidents/presentation/screens/IncidentManagement/IncidentManagementPage'));
>>>>>>> 73b4edbbcbf964270cad07a5c636a932582d618d

/* Pantalla Táctica (Móvil) */
import Monitor from './features/auth/presentation/screens/Monitor/Monitor';

setupIonicReact();

const App: React.FC = () => (
  <AuthProvider>
    <IonApp>
      <IonReactRouter>
        {/* Suspense maneja la carga asíncrona de las pantallas */}
        <Suspense fallback={<IonLoading isOpen={true} message="Cargando SIGEP..." />}>
          <IonRouterOutlet>

<<<<<<< HEAD
          {/* Rutas Públicas de PC */}
          <Route exact path="/login">
            <PublicRoute><Login /></PublicRoute>
          </Route>
=======
            {/* Rutas Públicas */}
            <Route exact path="/login">
              <PublicRoute><Login /></PublicRoute>
            </Route>
>>>>>>> 73b4edbbcbf964270cad07a5c636a932582d618d

            <Route exact path="/register">
              <PublicRoute><Register /></PublicRoute>
            </Route>

            <Route exact path="/reset-password">
              <PublicRoute><ResetPassword /></PublicRoute>
            </Route>

<<<<<<< HEAD
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
=======
            {/* Rutas Protegidas */}
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
>>>>>>> 73b4edbbcbf964270cad07a5c636a932582d618d

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
        </Suspense>
      </IonReactRouter>
    </IonApp>
  </AuthProvider>
);

export default App;