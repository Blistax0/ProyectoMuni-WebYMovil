import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { mailOutline, lockClosedOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import InputField from '../../components/InputField/InputField';
import CustomButton from '../../components/CustomButton/CustomButton';
import './Login.scss';

const Login: React.FC = () => {
  const history = useHistory();

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
                <InputField 
                  label="Correo electrónico" 
                  placeholder="Introduce tu correo electrónico" 
                  icon={mailOutline} 
                  type="email" 
                />
                <InputField 
                  label="Contraseña" 
                  placeholder="Introduce tu contraseña" 
                  icon={lockClosedOutline} 
                  type="password" 
                />
                
                <div className="remember-me">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Recuérdame</label>
                </div>

                <div className="button-wrapper">
                  <CustomButton text="Iniciar Sesión" variant="primary" size="large" />
                </div>
              </div>

              <footer className="login-footer">
                <span 
                  className="footer-link" 
                  onClick={() => history.push('/register')}
                >CREAR CUENTA</span>
                <span 
                  className="footer-link" 
                  onClick={() => history.push('/reset-password')}
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
      </IonContent>
    </IonPage>
  );
};

export default Login;
