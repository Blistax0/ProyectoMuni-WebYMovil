import React, { useState } from 'react';
import { IonContent, IonPage, useIonRouter, IonToast } from '@ionic/react';
import { personOutline, peopleOutline, mailOutline, locationOutline, mapOutline, lockClosedOutline, idCardOutline, callOutline } from 'ionicons/icons';
import InputField from '../../components/InputField/InputField';
import CustomButton from '../../components/CustomButton/CustomButton';
import StepIndicator from '../../components/StepIndicator/StepIndicator';
import API from '../../api/axios'; // Importamos la conexión al backend
import './Register.scss';

const Register: React.FC = () => {
  const [step, setStep] = useState(1);
  const router = useIonRouter();

  // Estados del formulario
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [region, setRegion] = useState('');
  const [comuna, setComuna] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terminos, setTerminos] = useState(false);

  // Estados para notificaciones
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<'danger' | 'success'>('danger');

  const showNotification = (msg: string, color: 'danger' | 'success' = 'danger') => {
    setToastMessage(msg);
    setToastColor(color);
    setShowToast(true);
  };

  const handleRegister = async () => {
    // Validaciones básicas front-end
    if (!rut || !nombre || !apellidos || !correo || !password) {
      return showNotification('Por favor, completa todos los campos obligatorios.');
    }
    if (password !== confirmPassword) {
      return showNotification('Las contraseñas no coinciden.');
    }
    if (!terminos) {
      return showNotification('Debes aceptar los términos y condiciones.');
    }

    try {
      const payload = {
        rut,
        nombre_completo: `${nombre} ${apellidos}`.trim(),
        correo,
        password_hash: password,
        telefono,
        region,
        comuna,
        // Por defecto todos los registros públicos serán PATRULLERO, los ADMIN se cambian manual
        rol: 'PATRULLERO' 
      };

      await API.post('/usuarios', payload);
      
      showNotification('¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.', 'success');
      
      // Redirigimos al login después de 2 segundos
      setTimeout(() => {
        router.push('/login', 'back', 'push');
      }, 2000);

    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.mensaje) {
        showNotification(`Error: ${error.response.data.mensaje}`);
      } else {
        showNotification('No se pudo conectar con el servidor para registrar la cuenta.');
      }
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding" style={{ '--background': '#ffffff' } as React.CSSProperties}>
        <div className="register-container">
          <header className="register-header">
            <h1>Crear nueva cuenta operativa</h1>
            <p className="step-title">Paso {step}: {step === 1 ? 'Datos Generales' : 'Seguridad'}</p>
            <StepIndicator currentStep={step} totalSteps={2} />
          </header>

          <main className="register-content">
            {step === 1 ? (
              <div className="register-grid fade-in">
                <InputField label="Primer Nombre" placeholder="Introduce tu Nombre" icon={personOutline} value={nombre} onChange={setNombre} />
                <InputField label="Región" placeholder="Introduce tu región" icon={mapOutline} value={region} onChange={setRegion} />
                <InputField label="Apellidos" placeholder="Introduce tus Apellidos" icon={peopleOutline} value={apellidos} onChange={setApellidos} />
                <InputField label="Comuna" placeholder="Introduce tu comuna" icon={locationOutline} value={comuna} onChange={setComuna} />
                <InputField label="Correo electrónico" placeholder="tucorreo@email.com" icon={mailOutline} type="email" value={correo} onChange={setCorreo} />
              </div>
            ) : (
              <div className="register-grid fade-in">
                <InputField label="Número de telefóno" placeholder="+56 9 12345678" icon={callOutline} type="tel" value={telefono} onChange={setTelefono} />
                <InputField label="Contraseña" placeholder="Introduce una contraseña" icon={lockClosedOutline} type="password" value={password} onChange={setPassword} />
                <InputField label="RUT" placeholder="12345678-9" icon={idCardOutline} value={rut} onChange={setRut} />
                <InputField label="Confirmación de contraseña" placeholder="Repite la contraseña" icon={lockClosedOutline} type="password" value={confirmPassword} onChange={setConfirmPassword} />
                
                <div className="terms-checkbox">
                  <input type="checkbox" id="terms" checked={terminos} onChange={(e) => setTerminos(e.target.checked)} />
                  <label htmlFor="terms">Acepto los términos y condiciones</label>
                </div>
              </div>
            )}
          </main>

          <footer className="register-footer">
            <CustomButton 
              text={step === 1 ? "Volver a Inicio de Sesión" : "Atrás"} 
              variant="primary" 
              size="large" 
              onClick={() => step === 1 ? router.push('/login', 'back', 'push') : setStep(1)}
            />
            <CustomButton 
              text={step === 1 ? "Siguiente" : "Registrarse"} 
              variant="primary" 
              size="large" 
              onClick={() => step === 1 ? setStep(2) : handleRegister()}
            />
          </footer>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          color={toastColor}
          position="bottom"
        />
      </IonContent>
    </IonPage>
  );
};

export default Register;
