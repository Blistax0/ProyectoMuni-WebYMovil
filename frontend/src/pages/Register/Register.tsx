import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { personOutline, peopleOutline, mailOutline, locationOutline, mapOutline, lockClosedOutline, idCardOutline, callOutline } from 'ionicons/icons';
import InputField from '../../components/InputField/InputField';
import CustomButton from '../../components/CustomButton/CustomButton';
import StepIndicator from '../../components/StepIndicator/StepIndicator';
import { useHistory } from 'react-router-dom';
import './Register.scss';

const Register: React.FC = () => {
  const [step, setStep] = useState(1);
  const history = useHistory();

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
                <InputField label="Primer Nombre" placeholder="Introduce tu Nombre" icon={personOutline} />
                <InputField label="Región" placeholder="Introduce tu región" icon={mapOutline} />
                <InputField label="Apellidos" placeholder="Introduce tus Apellidos" icon={peopleOutline} />
                <InputField label="Comuna" placeholder="Introduce tu comuna" icon={locationOutline} />
                <InputField label="Correo electrónico" placeholder="tucorreo@email.com" icon={mailOutline} type="email" />
              </div>
            ) : (
              <div className="register-grid fade-in">
                <InputField label="Número de telefóno" placeholder="+56 9 12345678" icon={callOutline} type="tel" />
                <InputField label="Contraseña" placeholder="Introduce una contraseña" icon={lockClosedOutline} type="password" />
                <InputField label="RUT" placeholder="00.000.000-0" icon={idCardOutline} />
                <InputField label="Confirmación de contraseña" placeholder="Repite la contraseña" icon={lockClosedOutline} type="password" />
                
                <div className="terms-checkbox">
                  <input type="checkbox" id="terms" />
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
              onClick={() => step === 1 ? history.push('/login') : setStep(1)}
            />
            <CustomButton 
              text={step === 1 ? "Siguiente" : "Registrarse"} 
              variant="primary" 
              size="large" 
              onClick={() => step === 1 ? setStep(2) : history.push('/login')}
            />
          </footer>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
