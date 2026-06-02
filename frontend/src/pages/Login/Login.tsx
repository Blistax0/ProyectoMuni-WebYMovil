import React, { useState } from 'react';
import { IonContent, IonPage, useIonRouter, IonToast } from '@ionic/react';
import { mailOutline, lockClosedOutline } from 'ionicons/icons';
import InputField from '../../components/InputField/InputField';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios'; // Importar instancia de Axios sin errores
import './Login.scss';

const Login: React.FC = () => {
  const router = useIonRouter();
  const { login } = useAuth();

  // Estados para capturar los datos del Formulario
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Estados para el Popup Rojo 
  const [showToast, setShowToast] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Función asíncrona conectada al Backend Real
  const handleLogin = async () => {
    // Si están vacíos, evitamos enviar la petición
    if (!email || !password) {
      setErrorMessage('Por favor, completa todos los campos.');
      setShowToast(true);
      return;
    }

    try {
      const response = await API.post('/auth/login', { correo: email, password });
      const { token, usuario } = response.data;
      const role = usuario.rol; // ADMIN o PATRULLERO

      // Pasamos ambos datos al contexto global
      login(token, role);

      // REDIRECCIÓN CONDICIONAL SEGÚN ROL 
      if (role === 'ADMIN') {
        router.push('/dashboard', 'forward', 'push'); // Panel Web Administrativo
      } else if (role === 'PATRULLERO') {
        router.push('/monitor', 'forward', 'push');   // Vista Móvil operativa
      } else {
        // Por si existe otro rol por defecto
        router.push('/dashboard', 'forward', 'push');
      }
    } catch (error: any) {
      // Manejo de Errores Críticos
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage('Credenciales incorrectas. Usuario no autorizado (401).');
        } else if (error.response.status === 404) {
          // El backend devuelve 404 cuando el correo no está registrado
          setErrorMessage(error.response.data?.mensaje || 'El servicio no fue encontrado (404).');
        } else {
          setErrorMessage(`Error del servidor: ${error.response.data?.mensaje || 'Inténtelo más tarde'}`);
        }
      } else {
        setErrorMessage('No se puede conectar con el servidor de la Municipalidad. ¿Está encendido el backend?');
      }

      // Desplegamos el popup rojo
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
        <div className="login-container">
          {/* Lado Izquierdo: Formulario */}
          <div className="login-form-side">
            <div className="login-card">
              <header className="login-header">
                <h1 className="title-sigep">Acceso SIGEP</h1>
                <p className="subtitle-sigep">Sistema de Gestión de Patrullaje</p>
              </header>

              <div className="form-fields">
                {/* Vinculamos los inputs con el estado usando value y onChange */}
                <InputField
                  label="Correo electrónico"
                  placeholder="Introduce tu correo electrónico"
                  icon={mailOutline}
                  type="email"
                  value={email}
                  onChange={(val: string) => setEmail(val)}
                />
                <InputField
                  label="Contraseña"
                  placeholder="Introduce tu contraseña"
                  icon={lockClosedOutline}
                  type="password"
                  value={password}
                  onChange={(val: string) => setPassword(val)}
                />

                <div className="remember-me">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Recuérdame</label>
                </div>

                <div className="button-wrapper">
                  <CustomButton
                    text="Iniciar Sesión"
                    variant="primary"
                    size="large"
                    onClick={handleLogin}
                  />
                </div>
              </div>

              <footer className="login-footer">
                <span
                  className="footer-link"
                  onClick={() => router.push('/register', 'forward', 'push')}
                >CREAR CUENTA</span>
                <span
                  className="footer-link"
                  onClick={() => router.push('/reset-password', 'forward', 'push')}
                >¿OLVIDASTE TU CONTRASEÑA?</span>
              </footer>
            </div>
          </div>

          {/* Lado Derecho: Imagen de Fondo */}
          <div className="login-image-side">
            <div className="logo-overlay">
              <img src="/assets/logo_municipalidad.png" alt="Municipalidad Santo Domingo" className="muni-logo" />
            </div>
          </div>
        </div>

        {/* POPUP ROJO DE ERROR */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={errorMessage}
          duration={4000}
          color="danger" // Vuelve el popup rojo automáticamente en Ionic
          position="bottom"
        />

      </IonContent>
    </IonPage>
  );
};

export default Login;
