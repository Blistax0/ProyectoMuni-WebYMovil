import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonToast // Importación añadida
} from '@ionic/react';

import {
  AxiosIncidentsRepository,
  Incident
} from '../../../data/repositories/axiosIncidentsRepository';

import { IncidentsUseCase } from '../../../domain/useCases/ejemploIncidentsUseCase';

import './IncidentManagementPage.scss';

const IncidentManagementPage: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Estados para el Toast
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const repository = new AxiosIncidentsRepository();
  const incidentsUseCase = new IncidentsUseCase(repository);

  const token = localStorage.getItem('sigep_token') || '';

  const loadIncidents = async () => {
    try {
      setLoading(true);
      if (token) {
        const data = await incidentsUseCase.executeGetIncidents(token);
        setIncidents(data);
      } else {
        console.error('No se encontró el token de administrador.');
      }
    } catch (error) {
      console.error('Error al cargar los incidentes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  const handleStatusChange = async (id: number, newStatus: any) => {
    try {
      if (!newStatus) return;

      await incidentsUseCase.executeUpdateStatus(id, newStatus, token);
      
      setIncidents(prevIncidents =>
        prevIncidents.map(inc =>
          inc.id === id ? { ...inc, estado_resolucion: newStatus } : inc
        )
      );

      // Notificación de éxito
      setToastMessage(`Incidente #${id} actualizado a ${newStatus.replace('_', ' ')}`);
      setShowToast(true);
    } catch (error) {
      console.error('Error al cambiar el estado:', error);
      setToastMessage('Error al actualizar el estado.');
      setShowToast(true);
    }
  };

  const totalIncidents = incidents.length;
  const pendingIncidents = incidents.filter(i => i.estado_resolucion === 'PENDIENTE').length;
  const processingIncidents = incidents.filter(i => i.estado_resolucion === 'EN_PROCESO').length;
  const resolvedIncidents = incidents.filter(i => i.estado_resolucion === 'RESUELTO').length;

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" text="Volver" />
          </IonButtons>
          <IonTitle>Gestión de Incidentes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="incident-dashboard-container">
          <div className="incident-header-section">
          <h2>Gestión de Incidentes</h2>
          <p>Central de Reportes SIGEP - Vista operativa en tiempo real.</p>
        </div>

        <div className="incident-stats">
          <div className="stat-card">
            <span className="stat-number">{totalIncidents}</span>
            <span className="stat-label">Total Reportes</span>
          </div>
          <div className="stat-card pending">
            <span className="stat-number">{pendingIncidents}</span>
            <span className="stat-label">Pendientes</span>
          </div>
          <div className="stat-card progress">
            <span className="stat-number">{processingIncidents}</span>
            <span className="stat-label">En Proceso</span>
          </div>
          <div className="stat-card resolved">
            <span className="stat-number">{resolvedIncidents}</span>
            <span className="stat-label">Resueltos</span>
          </div>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
            <IonSpinner name="crescent" />
          </div>
        ) : (
          <div className="incident-cards-grid">
            {incidents.length === 0 ? ( 
              <div style={{ padding: '40px', textAlign: 'center' }}>
                No hay incidentes reportados en este momento.
              </div>
            ) : (
              incidents.map((inc) => (
                <div key={inc.id} className="incident-card">
                  <div className="incident-top">
                    <span className="incident-id">#{inc.id}</span>
                    <span className={`badge-gravedad ${inc.nivel_gravedad.toLowerCase()}`}>
                      {inc.nivel_gravedad}
                    </span>
                  </div>

                  <div className="incident-main">
                    <h3 className="incident-title">{inc.tipo_incidente}</h3>
                    <p className="incident-description">{inc.descripcion}</p>
                  </div>

                  <div className="incident-footer">
                    <span className="incident-location">
                      Ubicación: {Number(inc.latitud).toFixed(4)}, {Number(inc.longitud).toFixed(4)}
                    </span>
                    
                    <IonSelect
                      value={inc.estado_resolucion}
                      interface="popover"
                      className="status-selector"
                      onIonChange={(e) => handleStatusChange(inc.id, e.detail.value)}
                    >
                      <IonSelectOption value="PENDIENTE">Pendiente</IonSelectOption>
                      <IonSelectOption value="EN_PROCESO">En Proceso</IonSelectOption>
                      <IonSelectOption value="RESUELTO">Resuelto</IonSelectOption>
                    </IonSelect>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Notificación Toast */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2500}
          position="bottom"
          color="primary"
        />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default IncidentManagementPage;