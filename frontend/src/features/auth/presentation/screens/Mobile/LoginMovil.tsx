import React, { useState } from 'react';
import { 
  IonPage, 
  IonContent, 
  useIonRouter
} from '@ionic/react';
import axios from 'axios';

const LoginMovil: React.FC = () => {
  const [correo, setCorreo] = useState<string>('');
  const [contrasena, setContrasena] = useState<string>('');
  const router = useIonRouter();

  const handleLogin = async () => {
    if (!correo || !contrasena) {
      alert('Por favor, complete todos los campos del formulario.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        correo: correo,
        password: contrasena
      });
      
      localStorage.setItem('sigep_token', response.data.token);
      localStorage.setItem('sigep_userdata', JSON.stringify(response.data.usuario));
      localStorage.setItem('sigep_auth', 'true');
      localStorage.setItem('sigep_role', response.data.usuario?.rol || 'PATRULLERO');
      localStorage.setItem('sigep_username', response.data.usuario?.nombre || 'Patrullero');
      
      window.location.href = '/monitor';
    } catch (error: any) {
      console.error('Error de autenticación:', error);
      if (error.response && error.response.data && error.response.data.mensaje) {
        alert(error.response.data.mensaje);
      } else {
        alert('Error de conexion con el servidor principal. Verifique el estado del backend.');
      }
    }
  };

  const irARegistro = () => {
    router.push('/app/register', 'forward');
  };

  return (
    <IonPage>
      <IonContent fullscreen style={{ '--background': '#ffffff' }}>
        
        <div style={{ height: '40%', width: '100%', position: 'relative' }}>
          <div style={{ 
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)', 
            zIndex: 1 
          }}></div>
          {/* Corrección de la ruta de la imagen */}
          <img 
            src="/assets/foto_muni.jpg" 
            alt="Vista Institucional Municipalidad" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 0 }} 
          />
        </div>

        <div style={{ 
          height: '65%', width: '100%', backgroundColor: '#ffffff', position: 'absolute', 
          top: '35%', borderTopLeftRadius: '35px', borderTopRightRadius: '35px', padding: '40px 25px',
          boxShadow: '0px -5px 15px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column',
          alignItems: 'center', zIndex: 2
        }}>
          
          <h1 style={{ fontWeight: 'bold', color: '#000000', margin: '0 0 10px 0', fontSize: '26px' }}>
            Inicio de sesión
          </h1>
          <p style={{ color: '#333333', fontSize: '14px', marginBottom: '35px' }}>
            Inicia sesión con tu cuenta de <span style={{ fontWeight: 'bold' }}>SIGEP</span>
          </p>

          <div style={{ width: '100%', marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', color: '#000000', display: 'block', marginBottom: '8px', fontSize: '15px' }}>
              Correo electrónico
            </label>
            <input 
              type="email" 
              placeholder="tucorreo@email.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              style={{ width: '100%', padding: '16px 20px', borderRadius: '30px', border: '2px solid #b3b3b3', fontSize: '15px', outline: 'none', color: '#333333', backgroundColor: 'transparent' }} 
            />
          </div>

          <div style={{ width: '100%', marginBottom: '35px' }}>
            <label style={{ fontWeight: 'bold', color: '#000000', display: 'block', marginBottom: '8px', fontSize: '15px' }}>
              Contraseña
            </label>
            <input 
              type="password" 
              placeholder="Introduce tu contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              style={{ width: '100%', padding: '16px 20px', borderRadius: '30px', border: '2px solid #b3b3b3', fontSize: '15px', outline: 'none', color: '#333333', backgroundColor: 'transparent' }} 
            />
          </div>

          <button 
            onClick={handleLogin}
            style={{ width: '100%', padding: '16px', borderRadius: '30px', backgroundColor: '#4A90E2', color: '#ffffff', fontWeight: 'bold', fontSize: '16px', border: 'none', cursor: 'pointer', marginBottom: '20px' }}
          >
            Iniciar Sesión
          </button>

          <p style={{ color: '#333333', fontSize: '14px', margin: 0 }}>
            ¿No tienes cuenta? <span onClick={irARegistro} style={{ fontWeight: 'bold', color: '#000000', cursor: 'pointer' }}>Registrate aquí</span>
          </p>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginMovil;