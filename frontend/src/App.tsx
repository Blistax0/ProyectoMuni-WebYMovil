import React, { Suspense, lazy } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact, IonSpinner } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Auth & Guards */
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './guards/ProtectedRoute';
import PublicRoute from './guards/PublicRoute';

/* Páginas Públicas (Lazy Loading) */
const Login = lazy(() => import('./pages/Login/Login'));
const Register = lazy(() => import('./pages/Register/Register'));
const ResetPassword = lazy(() => import('./pages/ResetPassword/ResetPassword'));

/* Páginas Protegidas (Lazy Loading) */
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const GeoFencingPage = lazy(() => import('./pages/GeoFencing/GeoFencingPage'));
const RouteHistoryPage = lazy(() => import('./pages/RouteHistory/RouteHistoryPage'));
const IncidentManagementPage = lazy(() => import('./pages/IncidentManagement/IncidentManagementPage'));

setupIonicReact();

const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
    <IonSpinner name="crescent" />
  </div>
);

const App: React.FC = () => (
  <AuthProvider>
    <IonApp>
      <IonReactRouter>
        <Suspense fallback={<LoadingFallback />}>
          <IonRouterOutlet>
            {/* ── Rutas Públicas (solo accesibles sin sesión) ──────────────── */}
            <PublicRoute exact path="/login" component={Login} />
            <PublicRoute exact path="/register" component={Register} />
            <PublicRoute exact path="/reset-password" component={ResetPassword} />

            {/* ── Rutas Protegidas (requieren sesión activa) ────────────────── */}
            <ProtectedRoute exact path="/dashboard" component={Dashboard} allowedRoles={['ADMIN', 'PATRULLERO']} />
            <ProtectedRoute exact path="/geofencing" component={GeoFencingPage} allowedRoles={['ADMIN', 'PATRULLERO']} />
            <ProtectedRoute exact path="/history" component={RouteHistoryPage} allowedRoles={['ADMIN', 'PATRULLERO']} />
            <ProtectedRoute exact path="/incidents" component={IncidentManagementPage} allowedRoles={['ADMIN', 'PATRULLERO']} />

            {/* ── Redirección raíz ─────────────────────────────────────────── */}
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
