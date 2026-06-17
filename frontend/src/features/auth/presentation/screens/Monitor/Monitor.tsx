import React, { useState, useEffect, useRef } from 'react';
import { 
  IonPage, IonFab, IonFabButton, IonIcon, IonModal, IonButton,
  IonSegment, IonSegmentButton, IonLabel, IonList, IonItem, IonBadge
} from '@ionic/react';
import { alertCircle, camera, send, close, personCircle, logOut, map, locate, car } from 'ionicons/icons';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import axios from 'axios';
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
  const [latitud, setLatitud] = useState<number>(-33.022); 
  const [longitud, setLongitud] = useState<number>(-71.551);
  const [zoomActual, setZoomActual] = useState<number>(16);
  
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [vistaGlobal, setVistaGlobal] = useState<boolean>(false);

  const [segmentoPerfil, setSegmentoPerfil] = useState<'datos' | 'patrullas'>('datos');
  const [usuarioActivo, setUsuarioActivo] = useState<any>({ nombre: 'Cargando...', correo: '', rol: '' });

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
    const userStr = localStorage.getItem('sigep_userdata');
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUsuarioActivo({ 
          nombre: userData.nombre || localStorage.getItem('sigep_username') || 'Patrullero', 
          correo: userData.correo || '', 
          rol: localStorage.getItem('sigep_role') || 'Patrullero' 
        });
      } catch (e) {
        console.error('Error al procesar informacion de usuario local');
      }
    } else {
      setUsuarioActivo({ nombre: 'Patrullero Demo', correo: 'patrulla@santodomingo.cl', rol: 'Patrullero' });
    }

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
      await axios.post('http://localhost:3000/api/incidentes', {
        tipo: 'Alerta de Panico', gravedad: 'Alta', descripcion: 'Boton de panico activado por el patrullero', foto: null, lat: latitud, lng: longitud, fecha_reporte: new Date().toISOString()
      });
      alert('Alerta de Panico enviada a la central con exito. Mantenga la calma, apoyo en camino.');
    } catch (error) {
      console.error('Error enviando panico:', error);
      alert('Error de conexion con la central al enviar alerta. Verifique su conexion.');
    }
  };

  const enviarReporteAlBackend = async () => {
    try {
      await axios.post('http://localhost:3000/api/incidentes', {
        tipo: tipoIncidente, gravedad: gravedad, descripcion: descripcion, foto: fotoBase64, lat: latitud, lng: longitud, fecha_reporte: new Date().toISOString()
      });
      alert('Reporte de incidente subido al sistema correctamente.');
      setShowModal(false);
      setTipoIncidente(''); setGravedad(''); setDescripcion(''); setFotoBase64(null);
    } catch (error) {
      console.error('Error al enviar incidente:', error);
      alert('Hubo un error al guardar el reporte.');
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
    localStorage.removeItem('sigep_token');
    localStorage.removeItem('sigep_userdata');
    localStorage.removeItem('sigep_auth');
    localStorage.removeItem('sigep_role');
    localStorage.removeItem('sigep_username');
    // Redirección corregida hacia el login móvil
    window.location.href = '/app/login'; 
  };

  const alternarVistaMapa = () => {
    setVistaGlobal(!vistaGlobal);
    setZoomActual(!vistaGlobal ? 14 : 16);
  };

  return (
    <IonPage style={{ background: '#ffffff', display: 'block', height: '100vh', width: '100vw', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '70px', background: '#ffffff', boxShadow: '0px 2px 10px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', padding: '0 15px', zIndex: 9999 }}>
        <IonButton fill="clear" onClick={() => setShowProfileModal(true)} style={{ height: '50px', margin: 0, padding: 0, marginRight: '10px' }}>
          <img src="/assets/logo_municipalidad.png" alt="Logo Santo Domingo" style={{ height: '40px', objectFit: 'contain' }} />
        </IonButton>
        <div>
          <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#003366' }}>SIGEP Táctico</h1>
          <p style={{ margin: 0, fontSize: '11px', color: '#666666', fontWeight: '500' }}>Central Móvil de Patrullaje</p>
        </div>
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
        <div style={{ padding: '20px', background: '#ffffff', height: '100%', color: '#111111', fontFamily: 'system-ui, sans-serif' }}>
          
          <IonSegment value={segmentoPerfil} onIonChange={e => setSegmentoPerfil(e.detail.value as 'datos' | 'patrullas')} style={{ marginBottom: '20px' }}>
            <IonSegmentButton value="datos"><IonLabel>Mis Datos</IonLabel></IonSegmentButton>
            <IonSegmentButton value="patrullas"><IonLabel>Patrullas Activas</IonLabel></IonSegmentButton>
          </IonSegment>

          {segmentoPerfil === 'datos' && (
            <div style={{ textAlign: 'center' }}>
              <IonIcon icon={personCircle} style={{ fontSize: '80px', color: '#003366' }} />
              <h2 style={{ margin: '10px 0 5px 0', fontWeight: 'bold', color: '#003366' }}>{usuarioActivo.nombre}</h2>
              <p style={{ margin: 0, color: '#666666', fontSize: '14px' }}>{usuarioActivo.rol}</p>
              <p style={{ margin: '5px 0 0 0', color: '#888888', fontSize: '13px' }}>{usuarioActivo.correo}</p>
              <hr style={{ border: '1px solid #f0f0f0', margin: '30px 0' }} />
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
    </IonPage>
  );
};

export default Monitor;