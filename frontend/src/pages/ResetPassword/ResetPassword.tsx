import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { mailOutline, lockClosedOutline } from 'ionicons/icons';
import InputField from '../../components/InputField/InputField';
import CustomButton from '../../components/CustomButton/CustomButton';
import StepIndicator from '../../components/StepIndicator/StepIndicator';
import CodeInput from '../../components/CodeInput/CodeInput';
import { useHistory } from 'react-router-dom';
import './ResetPassword.scss';

const ResetPassword: React.FC = () => {
  const [step, setStep] = useState(1);
  const history = useHistory();

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding" style={{ '--background': '#ffffff' } as React.CSSProperties}>
        <div className="reset-container">
          <header className="reset-header">
            <h1>Cambiar Contraseña</h1>
            <StepIndicator currentStep={step} totalSteps={3} />
          </header>

          <main className="reset-content">
            {/* Paso 1: Email */}
            <section className="reset-section">
              <div className="field-row">
                <InputField 
                  label="Correo electrónico" 
                  placeholder="Introduce tu correo electrónico" 
                  icon={mailOutline} 
                  type="email" 
                />
                <div className="action-btn">
                  <CustomButton 
                    text="Enviar Código" 
                    variant="secondary" 
                    size="compact" 
                    onClick={() => setStep(2)}
                  />
                </div>
              </div>
            </section>

            {/* Paso 2: Código (Visible en paso 2 y 3) */}
            {step >= 2 && (
              <section className="reset-section fade-in">
                <p className="field-label-centered">Código de verificación</p>
                <div className="field-row">
                  <CodeInput onChange={(code) => console.log(code)} />
                  <div className="action-btn">
                    <CustomButton 
                      text="Confirmar" 
                      variant="secondary" 
                      size="compact" 
                      onClick={() => setStep(3)}
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Paso 3: Nueva Contraseña */}
            {step === 3 && (
              <section className="reset-section fade-in">
                <div className="password-fields">
                  <InputField 
                    label="Contraseña" 
                    placeholder="Introduce una contraseña" 
                    icon={lockClosedOutline} 
                    type="password" 
                  />
                  <InputField 
                    label="Confirmación de contraseña" 
                    placeholder="Repite la contraseña" 
                    icon={lockClosedOutline} 
                    type="password" 
                  />
                </div>
              </section>
            )}
          </main>

          <footer className="reset-footer">
            <div className="footer-btn">
              <CustomButton 
                text="Volver a Inicio de Sesión" 
                variant="primary" 
                size="large" 
                onClick={() => history.push('/login')}
              />
            </div>
            {step === 3 && (
              <div className="footer-btn">
                <CustomButton 
                  text="Cambiar Contraseña" 
                  variant="primary" 
                  size="large" 
                  onClick={() => history.push('/login')}
                />
              </div>
            )}
          </footer>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ResetPassword;
