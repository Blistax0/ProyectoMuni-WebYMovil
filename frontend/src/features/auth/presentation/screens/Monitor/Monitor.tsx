import React, { useState, useEffect, useRef } from 'react';
import { 
  IonPage, IonFab, IonFabButton, IonIcon, IonModal, IonButton,
  IonSegment, IonSegmentButton, IonLabel, IonList, IonItem, IonBadge, IonToast
} from '@ionic/react';
import { alertCircle, camera, send, close, personCircle, logOut, map, locate, car, personOutline } from 'ionicons/icons';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AxiosIncidentsRepository } from '../../../../incidents/data/repositories/axiosIncidentsRepository';
import { IncidentsUseCase } from '../../../../incidents/domain/useCases/ejemploIncidentsUseCase';
import { useAuth } from '../../../../auth/domain/AuthContext';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const RecenterMap: React.FC<{ lat: number; lng: number; zoom: number }> = ({ lat, lng, zoom }) => {
  const mapInstance = useMap();
  useEffect(() => {
    mapInstance.setView([lat, lng], zoom);
  }, [lat, lng, zoom, mapInstance]);
  return null;
};

const Monitor: React.FC = () => {
  const { user, logout } = useAuth();
  const [latitud, setLatitud] = useState<number>(-33.022); 
  const [longitud, setLongitud] = useState<number>(-71.551);
  const [zoomActual, setZoomActual] = useState<number>(16);
  
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [vistaGlobal, setVistaGlobal] = useState<boolean>(false);

  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastColor, setToastColor] = useState<'success' | 'danger'>('success');

  const showNotification = (msg: string, color: 'success' | 'danger' = 'success') => {
    setToastMessage(msg);
    setToastColor(color);
    setShowToast(true);
  };

  const [segmentoPerfil, setSegmentoPerfil] = useState<'datos' | 'patrullas'>('datos');

  const [isPressingPanic, setIsPressingPanic] = useState<boolean>(false);
  const panicTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [tipoIncidente, setTipoIncidente] = useState<string>('');
  const [gravedad, setGravedad] = useState<string>('');
  const [descripcion, setDescripcion] = useState<string>('');
  const [fotoBase64, setFotoBase64] = useState<string | null>(null);

  const companeros = [
    { id: 1, lat: -33.020, lng: -71.549, nombre: 'Patrulla 2 - Sector Norte', estado: 'Operativa' },
    { id: 2, lat: -33.025, lng: -71.553, nombre: 'Patrulla 3 - Sector Centro', estado: 'En Procedimiento' }
  ];

  useEffect(() => {
    const obtenerUbicacionReal = async () => {
      try {
        const permisos = await Geolocation.requestPermissions();
        if (permisos.location === 'granted') {
          const posicion = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
          setLatitud(posicion.coords.latitude);
          setLongitud(posicion.coords.longitude);
        }
      } catch (error) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (posicion) => {
              setLatitud(posicion.coords.latitude);
              setLongitud(posicion.coords.longitude);
            },
            (err) => console.error('Error GPS:', err),
            { enableHighAccuracy: true }
          );
        }
      }
    };
    obtenerUbicacionReal();
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsPressingPanic(true);
    if (panicTimerRef.current) clearTimeout(panicTimerRef.current);
    panicTimerRef.current = setTimeout(() => {
      dispararBotonDePanico();
      setIsPressingPanic(false);
    }, 3000);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsPressingPanic(false);
    if (panicTimerRef.current) {
      clearTimeout(panicTimerRef.current);
      panicTimerRef.current = null;
    }
  };

  const dispararBotonDePanico = async () => {
    try {
      const token = localStorage.getItem('sigep_token') || '';
      const repo = new AxiosIncidentsRepository();
      const useCase = new IncidentsUseCase(repo);
      
      await useCase.executeCreateIncident({
        tipo_incidente: 'Alerta de Panico',
        nivel_gravedad: 'ALTA',
        descripcion: 'Boton de panico activado por el patrullero',
        latitud: latitud,
        longitud: longitud,
      }, token);
      
      showNotification('Alerta de Panico enviada a la central con exito. Mantenga la calma, apoyo en camino.', 'success');
    } catch (error) {
      console.error('Error enviando panico:', error);
      showNotification('Error de conexion con la central al enviar alerta. Verifique su conexion.', 'danger');
    }
  };

  const enviarReporteAlBackend = async () => {
    try {
      const token = localStorage.getItem('sigep_token') || '';
      const repo = new AxiosIncidentsRepository();
      const useCase = new IncidentsUseCase(repo);

      await useCase.executeCreateIncident({
        tipo_incidente: tipoIncidente,
        nivel_gravedad: gravedad.toUpperCase() as 'BAJA' | 'MEDIA' | 'ALTA',
        descripcion: descripcion,
        latitud: latitud,
        longitud: longitud,
        evidencia_url: fotoBase64 || undefined
      }, token);
      
      showNotification('Reporte de incidente subido al sistema correctamente.', 'success');
      setShowModal(false);
      setTipoIncidente(''); setGravedad(''); setDescripcion(''); setFotoBase64(null);
    } catch (error) {
      console.error('Error al enviar incidente:', error);
      showNotification('Hubo un error al guardar el reporte.', 'danger');
    }
  };

  const tomarEvidenciaFotografica = async () => {
    try {
      const image = await Camera.getPhoto({ quality: 90, allowEditing: false, resultType: CameraResultType.Base64, source: CameraSource.Camera });
      if (image.base64String) setFotoBase64(`data:image/jpeg;base64,${image.base64String}`);
    } catch (error) {
      console.error('Error camara:', error);
    }
  };

  const cerrarSesion = () => {
    logout();
    window.location.href = '/app/login'; 
  };

  const alternarVistaMapa = () => {
    setVistaGlobal(!vistaGlobal);
    setZoomActual(!vistaGlobal ? 14 : 16);
  };

  return (
    <IonPage style={{ background: '#ffffff', display: 'block', height: '100vh', width: '100vw', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '70px', background: '#ffffff', boxShadow: '0px 2px 10px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 15px', zIndex: 9999 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IonButton fill="clear" style={{ height: '50px', margin: 0, padding: 0, marginRight: '10px', pointerEvents: 'none' }}>
            <img src="/assets/logo_municipalidad.png" alt="Logo Santo Domingo" style={{ height: '40px', objectFit: 'contain' }} />
          </IonButton>
          <div>
            <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#003366' }}>SIGEP Táctico</h1>
            <p style={{ margin: 0, fontSize: '11px', color: '#666666', fontWeight: '500' }}>Central Móvil de Patrullaje</p>
          </div>
        </div>
        <button 
          onClick={() => setShowProfileModal(true)} 
          style={{ background: '#003366', color: '#fff', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          <IonIcon icon={personOutline} style={{ fontSize: '20px' }} />
        </button>
      </div>

      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1, paddingTop: '70px' }}>
        <MapContainer center={[latitud, longitud]} zoom={zoomActual} style={{ width: '100%', height: '100%' }} zoomControl={false}>
          <TileLayer url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" maxZoom={20} />
          <Marker position={[latitud, longitud]}><Popup>Tu unidad tactica actual</Popup></Marker>
          {vistaGlobal && companeros.map(comp => (
            <Marker key={comp.id} position={[comp.lat, comp.lng]}><Popup>{comp.nombre}</Popup></Marker>
          ))}
          <RecenterMap lat={latitud} lng={longitud} zoom={zoomActual} />
        </MapContainer>
      </div>

      <IonFab slot="fixed" vertical="top" horizontal="start" style={{ marginTop: '85px', marginLeft: '15px', zIndex: 1000 }}>
        <IonFabButton onClick={alternarVistaMapa} style={{ '--background': '#ffffff', '--color': '#003366', width: '45px', height: '45px' }}>
          <IonIcon icon={vistaGlobal ? locate : map} style={{ fontSize: '22px' }} />
        </IonFabButton>
      </IonFab>

      <div 
        onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} onPointerLeave={handlePointerUp}
        style={{
          position: 'absolute', top: '85px', right: '15px', zIndex: 1100, background: '#eb445a', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: isPressingPanic ? '12px 16px' : '0px', width: isPressingPanic ? '280px' : '60px', height: isPressingPanic ? '85px' : '60px',
          borderRadius: isPressingPanic ? '14px' : '50%', boxShadow: '0px 4px 12px rgba(235, 68, 90, 0.4)', transition: 'all 0.35s ease-in-out',
          cursor: 'pointer', userSelect: 'none', overflow: 'hidden', textAlign: 'center', touchAction: 'none'
        }}
      >
        {!isPressingPanic ? (
          <IonIcon icon={alertCircle} style={{ fontSize: '34px' }} />
        ) : (
          <span style={{ fontSize: '12px', fontWeight: 'bold', lineHeight: '1.4', animation: 'pulse 1s infinite alternate' }}>
            Boton de panico: mantener 3 segundos para enviar mensaje de auxilio
          </span>
        )}
      </div>

      <IonFab slot="fixed" vertical="bottom" horizontal="center" style={{ marginBottom: '30px', zIndex: 1000, width: '90%', display: 'flex', justifyContent: 'center' }}>
        <IonButton onClick={() => setShowModal(true)} size="large" style={{ '--background': '#003366', color: '#ffffff', fontWeight: 'bold', width: '100%', maxWidth: '320px', height: '55px', '--border-radius': '12px' }}>
          Reportar Incidente
        </IonButton>
      </IonFab>

      <IonModal isOpen={showProfileModal} onDidDismiss={() => setShowProfileModal(false)} initialBreakpoint={0.75} breakpoints={[0, 0.75, 1]} style={{ zIndex: 2000 }}>
        <div style={{ padding: '20px', background: '#ffffff', height: '100%', color: '#111111', fontFamily: 'system-ui, sans-serif', overflowY: 'auto' }}>
          
          <IonSegment value={segmentoPerfil} onIonChange={e => setSegmentoPerfil(e.detail.value as 'datos' | 'patrullas')} style={{ marginBottom: '20px' }}>
            <IonSegmentButton value="datos"><IonLabel>Mis Datos</IonLabel></IonSegmentButton>
            <IonSegmentButton value="patrullas"><IonLabel>Patrullas Activas</IonLabel></IonSegmentButton>
          </IonSegment>

          {segmentoPerfil === 'datos' && (
            <div style={{ textAlign: 'center' }}>
              <IonIcon icon={personCircle} style={{ fontSize: '80px', color: '#003366' }} />
              <h2 style={{ margin: '10px 0 5px 0', fontWeight: 'bold', color: '#003366' }}>{user?.nombre_completo || 'Usuario SIGEP'}</h2>
              <p style={{ margin: 0, color: '#666666', fontSize: '14px' }}>{user?.rol || 'Patrullero'}</p>
              
              <div style={{ marginTop: '25px', textAlign: 'left', background: '#f5f7fa', padding: '15px', borderRadius: '12px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#003366', marginBottom: '15px', marginTop: 0 }}>Información Detallada</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', fontWeight: 'bold' }}>RUT</span>
                    <p style={{ margin: '2px 0 0', fontSize: '14px', color: '#333' }}>{user?.rut || 'No especificado'}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', fontWeight: 'bold' }}>Teléfono</span>
                    <p style={{ margin: '2px 0 0', fontSize: '14px', color: '#333' }}>{user?.telefono || 'No especificado'}</p>
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <span style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', fontWeight: 'bold' }}>Correo</span>
                    <p style={{ margin: '2px 0 0', fontSize: '14px', color: '#333', wordBreak: 'break-all' }}>{user?.correo || 'No especificado'}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', fontWeight: 'bold' }}>Región</span>
                    <p style={{ margin: '2px 0 0', fontSize: '14px', color: '#333' }}>{user?.region || 'No especificada'}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', fontWeight: 'bold' }}>Comuna</span>
                    <p style={{ margin: '2px 0 0', fontSize: '14px', color: '#333' }}>{user?.comuna || 'No especificada'}</p>
                  </div>
                </div>
              </div>

              <hr style={{ border: '1px solid #f0f0f0', margin: '25px 0' }} />
              <IonButton expand="block" color="danger" fill="outline" onClick={cerrarSesion} style={{ fontWeight: 'bold' }}>
                <IonIcon slot="start" icon={logOut} /> Cerrar Sesion Segura
              </IonButton>
            </div>
          )}

          {segmentoPerfil === 'patrullas' && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#003366', marginBottom: '15px' }}>Monitoreo en Terreno</h3>
              <IonList>
                {companeros.map(comp => (
                  <IonItem key={comp.id} lines="full">
                    <IonIcon icon={car} slot="start" style={{ color: '#003366' }} />
                    <IonLabel><h2 style={{ fontWeight: '600', fontSize: '15px' }}>{comp.nombre}</h2><p style={{ fontSize: '12px' }}>Distancia aprox: 1.2 km</p></IonLabel>
                    <IonBadge color={comp.estado === 'Operativa' ? 'success' : 'warning'} slot="end">{comp.estado}</IonBadge>
                  </IonItem>
                ))}
              </IonList>
            </div>
          )}
        </div>
      </IonModal>

      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)} style={{ zIndex: 2000 }}>
        <div style={{ padding: '24px', background: '#ffffff', height: '100%', overflowY: 'auto', color: '#111111', fontFamily: 'system-ui, sans-serif' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #f0f0f0', paddingBottom: '15px' }}>
            <div><h3 style={{ margin: 0, color: '#003366', fontWeight: 'bold', fontSize: '20px' }}>Nuevo Reporte</h3><p style={{ margin: 0, fontSize: '12px', color: '#666666' }}>Formulario de salida tactica</p></div>
            <IonButton fill="clear" color="dark" onClick={() => setShowModal(false)}><IonIcon icon={close} style={{ fontSize: '28px' }} /></IonButton>
          </div>
          <div style={{ marginTop: '25px' }}><label style={{ fontWeight: '600', display: 'block', marginBottom: '8px', color: '#003366', fontSize: '14px' }}>Tipo de Incidente</label><select value={tipoIncidente} onChange={e => setTipoIncidente(e.target.value)} style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #cccccc', background: '#f9f9f9', color: '#111111', fontSize: '15px' }}><option value="">Selecciona el tipo...</option><option value="Robo">Robo / Hurto</option><option value="Accidente">Accidente de Transito</option><option value="Luminaria">Falla de Luminaria publica</option><option value="Sospechoso">Individuo Sospechoso</option><option value="Otro">Especificar</option></select></div>
          <div style={{ marginTop: '20px' }}><label style={{ fontWeight: '600', display: 'block', marginBottom: '8px', color: '#003366', fontSize: '14px' }}>Nivel de Gravedad</label><select value={gravedad} onChange={e => setGravedad(e.target.value)} style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #cccccc', background: '#f9f9f9', color: '#111111', fontSize: '15px' }}><option value="">Determina el impacto...</option><option value="Baja">Gravedad Baja</option><option value="Media">Gravedad Media</option><option value="Alta">Gravedad Alta</option></select></div>
          <div style={{ marginTop: '20px' }}><label style={{ fontWeight: '600', display: 'block', marginBottom: '8px', color: '#003366', fontSize: '14px' }}>Descripcion del Evento</label><textarea rows={4} value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder="Detalla los hechos..." style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #cccccc', background: '#f9f9f9', color: '#111111', fontSize: '15px', resize: 'none' }} /></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '25px', padding: '20px', border: '2px dashed #cccccc', borderRadius: '12px', background: '#fafafa' }}><IonButton fill="clear" onClick={tomarEvidenciaFotografica} style={{ '--color': '#003366', fontWeight: 'bold' }}><IonIcon slot="start" icon={camera} style={{ fontSize: '20px' }} /> Adjuntar Evidencia</IonButton>{fotoBase64 && (<img src={fotoBase64} alt="Evidencia" style={{ width: '100%', maxWidth: '260px', marginTop: '15px', borderRadius: '10px' }} />)}</div>
          <div style={{ marginTop: '30px' }}><IonButton expand="block" onClick={enviarReporteAlBackend} disabled={!tipoIncidente || !gravedad} style={{ '--background': '#2dd36f', color: '#ffffff', fontWeight: 'bold', height: '50px', '--border-radius': '10px' }}><IonIcon slot="start" icon={send} /> Enviar Reporte</IonButton></div>
        </div>
      </IonModal>

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={3000}
        color={toastColor}
        position="bottom"
      />
    </IonPage>
  );
};

export default Monitor;