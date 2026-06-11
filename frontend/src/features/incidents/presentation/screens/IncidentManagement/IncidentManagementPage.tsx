import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import Sidebar from '../../../../../core/presentation/components/Sidebar/Sidebar';
import './IncidentManagementPage.scss';

const IncidentManagementPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
        <div className="incident-management-page">
          <Sidebar />
          
          <main className="incident-content">
            <h1 className="placeholder-text">GESTION</h1>
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default IncidentManagementPage;
