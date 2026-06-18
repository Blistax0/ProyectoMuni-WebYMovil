import React, { useState } from 'react';
import { IonPage, IonContent, useIonRouter, IonToast } from '@ionic/react';
import API from '../../../../../core/config/axios';

const RegistroMovil: React.FC = () => {
  const router = useIonRouter();

  const [nombre, setNombre] = useState<string>('');
  const [apellidos, setApellidos] = useState<string>('');
  const [correo, setCorreo] = useState<string>('');
  const [telefono, setTelefono] = useState<string>('');
  const [rut, setRut] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [comuna, setComuna] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [terminos, setTerminos] = useState<boolean>(false);

  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastColor, setToastColor] = useState<'danger' | 'success'>('danger');

  const showNotification = (msg: string, color: 'danger' | 'success' = 'danger') => {
    setToastMessage(msg);
    setToastColor(color);
    setShowToast(true);
  };

  const handleRegistro = async () => {
    if (!rut || !nombre || !apellidos || !correo || !password || !confirmPassword) {
      showNotification('Por favor, completa todos los campos obligatorios.');
      return;
    }
    if (password !== confirmPassword) {
      showNotification('Las contraseñas introducidas no coinciden.');
      return;
    }
    if (!terminos) {
      showNotification('Debe aceptar los terminos y condiciones operativas del sistema.');
      return;
    }

    try {
      const payload = {
        rut: rut,
        nombre_completo: `${nombre} ${apellidos}`.trim(),
        correo: correo,
        password_hash: password,
        telefono: telefono,
        region: region,
        comuna: comuna,
        rol: 'PATRULLERO'
      };

      await API.post('/auth/register', payload);
      
      showNotification('Cuenta operativa creada con exito. Redirigiendo al inicio de sesion.', 'success');
      
      setTimeout(() => {
        router.push('/app/login', 'back', 'replace');
      }, 2000);

    } catch (error: any) {
      console.error('Error durante el proceso de registro:', error);
      if (error.response && error.response.data && error.response.data.mensaje) {
        showNotification(`Error: ${error.response.data.mensaje}`);
      } else {
        showNotification('No se pudo establecer conexion con el servidor principal.');
      }
    }
  };

  const volverAlLogin = () => {
    router.push('/app/login', 'back');
  };

  return (
    <IonPage>
      <IonContent>
        <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#ffffff', overflow: 'hidden' }}>
          
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '30%' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 1 }}></div>
            <img 
              src="/assets/foto_muni.jpg" 
              alt="Vista Municipalidad" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 0 }} 
            />
          </div>

          <div style={{ 
            position: 'absolute', top: '25%', left: 0, width: '100%', height: '75%', 
            background: '#ffffff', borderTopLeftRadius: '35px', borderTopRightRadius: '35px',
            padding: '30px 25px 40px 25px', display: 'flex', flexDirection: 'column', 
            zIndex: 2, overflowY: 'auto'
          }}>
            
            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              <h1 style={{ fontWeight: 'bold', color: '#000000', margin: '0 0 5px 0', fontSize: '24px' }}>Crear cuenta móvil</h1>
              <p style={{ color: '#333333', fontSize: '14px', margin: 0 }}>Formulario de registro para el personal de <span style={{ fontWeight: 'bold' }}>SIGEP</span></p>
            </div>

            <div style={{ width: '100%', marginBottom: '15px' }}>
              <label style={{ fontWeight: 'bold', color: '#000000', display: 'block', marginBottom: '6px', fontSize: '14px' }}>Primer Nombre</label>
              <input type="text" placeholder="Introduce tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} style={{ width: '100%', padding: '14px 20px', borderRadius: '30px', border: '2px solid #b3b3b3', fontSize: '14px', outline: 'none', color: '#000000', backgroundColor: '#ffffff' }} />
            </div>

            <div style={{ width: '100%', marginBottom: '15px' }}>
              <label style={{ fontWeight: 'bold', color: '#000000', display: 'block', marginBottom: '6px', fontSize: '14px' }}>Apellidos</label>
              <input type="text" placeholder="Introduce tus apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} style={{ width: '100%', padding: '14px 20px', borderRadius: '30px', border: '2px solid #b3b3b3', fontSize: '14px', outline: 'none', color: '#000000', backgroundColor: '#ffffff' }} />
            </div>

            <div style={{ width: '100%', marginBottom: '15px' }}>
              <label style={{ fontWeight: 'bold', color: '#000000', display: 'block', marginBottom: '6px', fontSize: '14px' }}>RUT</label>
              <input type="text" placeholder="12345678-9" value={rut} onChange={(e) => setRut(e.target.value)} style={{ width: '100%', padding: '14px 20px', borderRadius: '30px', border: '2px solid #b3b3b3', fontSize: '14px', outline: 'none', color: '#000000', backgroundColor: '#ffffff' }} />
            </div>

            <div style={{ width: '100%', marginBottom: '15px' }}>
              <label style={{ fontWeight: 'bold', color: '#000000', display: 'block', marginBottom: '6px', fontSize: '14px' }}>Correo electrónico</label>
              <input type="email" placeholder="tucorreo@email.com" value={correo} onChange={(e) => setCorreo(e.target.value)} style={{ width: '100%', padding: '14px 20px', borderRadius: '30px', border: '2px solid #b3b3b3', fontSize: '14px', outline: 'none', color: '#000000', backgroundColor: '#ffffff' }} />
            </div>

            <div style={{ width: '100%', marginBottom: '15px' }}>
              <label style={{ fontWeight: 'bold', color: '#000000', display: 'block', marginBottom: '6px', fontSize: '14px' }}>Número de teléfono</label>
              <input type="tel" placeholder="+56 9 12345678" value={telefono} onChange={(e) => setTelefono(e.target.value)} style={{ width: '100%', padding: '14px 20px', borderRadius: '30px', border: '2px solid #b3b3b3', fontSize: '14px', outline: 'none', color: '#000000', backgroundColor: '#ffffff' }} />
            </div>

            <div style={{ width: '100%', marginBottom: '15px' }}>
              <label style={{ fontWeight: 'bold', color: '#000000', display: 'block', marginBottom: '6px', fontSize: '14px' }}>Región</label>
              <input type="text" placeholder="Introduce tu region" value={region} onChange={(e) => setRegion(e.target.value)} style={{ width: '100%', padding: '14px 20px', borderRadius: '30px', border: '2px solid #b3b3b3', fontSize: '14px', outline: 'none', color: '#000000', backgroundColor: '#ffffff' }} />
            </div>

            <div style={{ width: '100%', marginBottom: '15px' }}>
              <label style={{ fontWeight: 'bold', color: '#000000', display: 'block', marginBottom: '6px', fontSize: '14px' }}>Comuna</label>
              <input type="text" placeholder="Introduce tu comuna" value={comuna} onChange={(e) => setComuna(e.target.value)} style={{ width: '100%', padding: '14px 20px', borderRadius: '30px', border: '2px solid #b3b3b3', fontSize: '14px', outline: 'none', color: '#000000', backgroundColor: '#ffffff' }} />
            </div>

            <div style={{ width: '100%', marginBottom: '15px' }}>
              <label style={{ fontWeight: 'bold', color: '#000000', display: 'block', marginBottom: '6px', fontSize: '14px' }}>Contraseña</label>
              <input type="password" placeholder="Introduce una contraseña" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '14px 20px', borderRadius: '30px', border: '2px solid #b3b3b3', fontSize: '14px', outline: 'none', color: '#000000', backgroundColor: '#ffffff' }} />
            </div>

            <div style={{ width: '100%', marginBottom: '25px' }}>
              <label style={{ fontWeight: 'bold', color: '#000000', display: 'block', marginBottom: '6px', fontSize: '14px' }}>Confirmación de contraseña</label>
              <input type="password" placeholder="Repite la contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{ width: '100%', padding: '14px 20px', borderRadius: '30px', border: '2px solid #b3b3b3', fontSize: '14px', outline: 'none', color: '#000000', backgroundColor: '#ffffff' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: '30px', padding: '0 5px' }}>
              <input type="checkbox" id="terms_movil" checked={terminos} onChange={(e) => setTerminos(e.target.checked)} style={{ transform: 'scale(1.2)', marginRight: '10px', cursor: 'pointer' }} />
              <label htmlFor="terms_movil" style={{ color: '#333333', fontSize: '13px', cursor: 'pointer', userSelect: 'none' }}>Acepto los términos y condiciones operativos del sistema</label>
            </div>

            <button onClick={handleRegistro} style={{ width: '100%', padding: '16px', borderRadius: '30px', backgroundColor: '#4A90E2', color: '#ffffff', fontWeight: 'bold', fontSize: '16px', border: 'none', cursor: 'pointer', marginBottom: '20px' }}>
              Registrarse
            </button>

            <p style={{ color: '#333333', fontSize: '14px', textAlign: 'center', margin: '0 0 20px 0' }}>
              ¿Ya tienes cuenta? <span onClick={volverAlLogin} style={{ fontWeight: 'bold', color: '#000000', cursor: 'pointer' }}>Inicia sesión aquí</span>
            </p>

          </div>
        </div>
        <IonToast isOpen={showToast} onDidDismiss={() => setShowToast(false)} message={toastMessage} duration={3000} color={toastColor} position="bottom" />
      </IonContent>
    </IonPage>
  );
};

export default RegistroMovil;