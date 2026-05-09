import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { personOutline, peopleOutline, mailOutline, lockClosedOutline, callOutline, mapOutline, locationOutline, idCardOutline } from 'ionicons/icons';
import InputField from '../components/InputField/InputField';
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
          <InputField label="Primer Nombre" placeholder="Introduce tu Nombre" icon={personOutline} type="text" />
          <InputField label="Apellidos" placeholder="Introduce tus Apellidos" icon={peopleOutline} type="text" />
          <InputField label="RUT" placeholder="00.000.000-0" icon={idCardOutline} type="text" />
          <InputField label="Correo electrónico" placeholder="tucorreo@email.com" icon={mailOutline} type="email" />
          <InputField label="Contraseña" placeholder="Introduce una contraseña" icon={lockClosedOutline} type="password" />
          <InputField label="Confirmación de contraseña" placeholder="Repite la contraseña" icon={lockClosedOutline} type="password" />
          <InputField label="Número de teléfono" placeholder="+56 9 12345678" icon={callOutline} type="tel" />
          <InputField label="Región" placeholder="Introduce tu región" icon={mapOutline} type="text" />
          <InputField label="Comuna" placeholder="Introduce tu comuna" icon={locationOutline} type="text" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
