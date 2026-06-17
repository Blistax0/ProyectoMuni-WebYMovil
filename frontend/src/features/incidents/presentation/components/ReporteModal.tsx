import React, { useState } from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import { camera, send, close } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

interface ReporteModalProps {
  isOpen: boolean;
  onClose: () => void;
  latitud: number;
  longitud: number;
  onSuccess: () => void;
}

const ReporteModal: React.FC<ReporteModalProps> = ({ isOpen, onClose, latitud, longitud, onSuccess }) => {
  const [tipoIncidente, setTipoIncidente] = useState<string>('');
  const [nivelGravedad, setNivelGravedad] = useState<string>('');
  const [descripcion, setDescripcion] = useState<string>('');
  const [fotoBase64, setFotoBase64] = useState<string | null>(null);

  // EF 5: Configurar la API nativa de la cámara para capturar la evidencia multimedia [cite: 27]
  const tomarFotoEvidencia = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera
      });

      if (image.base64String) {
        setFotoBase64(`data:image/jpeg;base64,${image.base64String}`);
      }
    } catch (error) {
      console.error("Cámara cerrada por el usuario:", error);
    }
  };

  // EF 1: Envío del formulario al backend (CRUD de salida)
  const enviarReporte = async () => {
    if (!tipoIncidente || !nivelGravedad || !descripcion) {
      alert("Por favor, rellena todos los campos obligatorios.");
      return;
    }

    const incidentePayload = {
      tipo_incidente: tipoIncidente,
      nivel_gravedad: nivelGravedad,
      latitud: latitud,
      longitud: longitud,
      descripcion: descripcion,
      evidencia_url: fotoBase64,
      patrullero_id: 1
    };

    try {
      const response = await fetch('http://localhost:3000/api/incidentes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(incidentePayload)
      });

      if (response.ok) {
        alert("¡Incidente reportado con éxito y guardado en MySQL!");
        onSuccess();
      } else {
        alert("Error en el servidor al procesar el reporte.");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} initialBreakpoint={0.85} breakpoints={[0, 0.85, 1]}>
      <IonHeader>
        <IonToolbar color="warning">
          <IonButtons slot="start">
            <IonButton onClick={onClose}>
              <IonIcon icon={close} slot="icon-only" color="dark" />
            </IonButton>
          </IonButtons>
          <IonTitle style={{ color: '#000' }}>Reportar Caso en Terreno</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <p style={{ fontSize: '12px', color: '#666' }}>
                📍 <strong>Coordenadas GPS fijadas:</strong> {latitud.toFixed(4)}, {longitud.toFixed(4)}
              </p>
            </IonCol>
          </IonRow>

          {/* Selector: Tipo de Incidente */}
          <IonItem mode="md">
            <IonLabel position="floating">Tipo de Incidente</IonLabel>
            <IonSelect value={tipoIncidente} onIonChange={e => setTipoIncidente(e.detail.value || '')}>
              <IonSelectOption value="Falta de luminaria costera">Falta de luminaria</IonSelectOption>
              <IonSelectOption value="Vehículo sospechoso">Vehículo sospechoso</IonSelectOption>
              <IonSelectOption value="Accidente vial">Accidente vial</IonSelectOption>
            </IonSelect>
          </IonItem>

          <div style={{ marginBottom: '16px' }} />

          {/* Selector: Nivel de Gravedad */}
          <IonItem mode="md">
            <IonLabel position="floating">Nivel de Gravedad</IonLabel>
            <IonSelect value={nivelGravedad} onIonChange={e => setNivelGravedad(e.detail.value || '')}>
              <IonSelectOption value="Baja">Baja</IonSelectOption>
              <IonSelectOption value="Media">Media</IonSelectOption>
              <IonSelectOption value="Alta">Alta</IonSelectOption>
            </IonSelect>
          </IonItem>

          <div style={{ marginBottom: '16px' }} />

          {/* Cuadro de texto: Descripción */}
          <IonItem mode="md">
            <IonLabel position="floating">Descripción de los hechos</IonLabel>
            <IonTextarea 
              value={descripcion} 
              onIonChange={e => setDescripcion(e.detail.value || '')} 
              rows={3} 
            />
          </IonItem>

          <div style={{ marginBottom: '16px' }} />

          {/* Botón de Cámara (Evidencia Multimedia) */}
          <IonButton expand="block" color="medium" onClick={tomarFotoEvidencia}>
            <IonIcon icon={camera} slot="start" />
            Capturar Evidencia Nativa
          </IonButton>

          <div style={{ marginBottom: '16px' }} />

          {/* Previsualización de la foto */}
          {fotoBase64 && (
            <div style={{ textAlign: 'center', marginBottom: '15px' }}>
              <img 
                src={fotoBase64} 
                alt="Evidencia" 
                style={{ width: '100%', maxHeight: '150px', borderRadius: '8px', objectFit: 'cover' }} 
              />
            </div>
          )}

{/* Botón de Envío */}
          <IonButton expand="block" color="dark" onClick={enviarReporte}>
            <IonIcon icon={send} slot="start" />
            Enviar Alerta a Central
          </IonButton>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default ReporteModal;