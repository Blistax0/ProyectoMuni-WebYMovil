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

/* Páginas con Lazy Loading */
const Login = lazy(() => import('./features/auth/presentation/screens/Login/Login'));
const Register = lazy(() => import('./features/auth/presentation/screens/Register/Register'));
const ResetPassword = lazy(() => import('./features/auth/presentation/screens/ResetPassword/ResetPassword'));
const Dashboard = lazy(() => import('./features/dashboard/presentation/screens/Dashboard/Dashboard'));
const GeoFencingPage = lazy(() => import('./features/geofencing/presentation/screens/GeoFencing/GeoFencingPage'));
const RouteHistoryPage = lazy(() => import('./features/tracking/presentation/screens/RouteHistory/RouteHistoryPage'));
const IncidentManagementPage = lazy(() => import('./features/incidents/presentation/screens/IncidentManagement/IncidentManagementPage'));

setupIonicReact();

const App: React.FC = () => (
  <AuthProvider>
    <IonApp>
      <IonReactRouter>
        {/* Suspense maneja la carga asíncrona de las pantallas */}
        <Suspense fallback={<IonLoading isOpen={true} message="Cargando SIGEP..." />}>
          <IonRouterOutlet>

            {/* Rutas Públicas */}
            <Route exact path="/login">
              <PublicRoute><Login /></PublicRoute>
            </Route>

            <Route exact path="/register">
              <PublicRoute><Register /></PublicRoute>
            </Route>

            <Route exact path="/reset-password">
              <PublicRoute><ResetPassword /></PublicRoute>
            </Route>

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