import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { personOutline, peopleOutline, mailOutline, lockClosedOutline, callOutline, mapOutline, locationOutline, idCardOutline } from 'ionicons/icons';
import InputField from '../../../../core/presentation/components/InputField/InputField';
import CustomButton from '../../../../core/presentation/components/CustomButton/CustomButton';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de Registro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
          {/* Inputs Section */}
          <InputField label="Primer Nombre" placeholder="Introduce tu Nombre" icon={personOutline} type="text" />
          <InputField label="Apellidos" placeholder="Introduce tus Apellidos" icon={peopleOutline} type="text" />
          <InputField label="RUT" placeholder="00.000.000-0" icon={idCardOutline} type="text" />
          <InputField label="Correo electrónico" placeholder="tucorreo@email.com" icon={mailOutline} type="email" />
          <InputField label="Contraseña" placeholder="Introduce una contraseña" icon={lockClosedOutline} type="password" />
          <InputField label="Confirmación de contraseña" placeholder="Repite la contraseña" icon={lockClosedOutline} type="password" />
          <InputField label="Número de teléfono" placeholder="+56 9 12345678" icon={callOutline} type="tel" />
          <InputField label="Región" placeholder="Introduce tu región" icon={mapOutline} type="text" />
          <InputField label="Comuna" placeholder="Introduce tu comuna" icon={locationOutline} type="text" />

          {/* Buttons Section - Galería de Ejemplos */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', alignItems: 'center', marginTop: '30px', paddingBottom: '50px' }}>
            <h2 style={{ fontFamily: 'Inter, sans-serif', color: '#333', borderBottom: '2px solid #36678f', width: '100%', textAlign: 'center', paddingBottom: '10px' }}>Galería de Botones</h2>
            
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#666', marginBottom: '10px' }}>Primarios (Grandes - 20px font)</p>
              <CustomButton text="Iniciar Sesión" variant="primary" size="large" />
            </div>

            <div style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <p style={{ color: '#666', marginBottom: '10px' }}>Selección (Medianos - 20px font)</p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <CustomButton text="Seleccionado" variant="select-orange" size="medium" />
                <CustomButton text="No Seleccionado" variant="select-blue" size="medium" />
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#666', marginBottom: '10px' }}>Perfil/Acciones (Medianos - 16px font)</p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <CustomButton text="Perfil de Usuario" variant="primary" size="medium" />
                <CustomButton text="Cancelar" variant="secondary" size="medium" />
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#666', marginBottom: '10px' }}>Compactos (16px font)</p>
              <CustomButton text="Enviar Código" variant="secondary" size="compact" />
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
