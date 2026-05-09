import React from 'react';
import { IonIcon } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import './RouteSummaryPanel.scss';

interface RouteSummaryPanelProps {
  patrolName: string;
  onClose: () => void;
  data: {
    date: string;
    range: string;
    distance: string;
    avgSpeed: string;
    events: string[];
  };
}

const RouteSummaryPanel: React.FC<RouteSummaryPanelProps> = ({ patrolName, onClose, data }) => {
  return (
    <aside className="route-summary-panel">
      <div className="panel-container">
        <div className="panel-header">
          <div className="title-group">
            <h2 className="panel-title">Historial de Ruta</h2>
            <p className="patrol-subtitle">{patrolName}</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <IonIcon icon={closeOutline} />
          </button>
        </div>

        <div className="info-sections">
          <section className="info-block">
            <div className="block-header">
              <h3>Filtros activos</h3>
            </div>
            <div className="block-content">
              <p>Fecha: {data.date}</p>
              <p>Rango: {data.range}</p>
            </div>
          </section>

          <section className="info-block">
            <div className="block-header">
              <h3>Resumen del Recorrido</h3>
            </div>
            <div className="block-content">
              <p>Distancia Total: {data.distance}</p>
              <p>Velocidad Promedio: {data.avgSpeed}</p>
            </div>
          </section>

          <section className="info-block">
            <div className="block-header">
              <h3>Eventos en la ruta</h3>
            </div>
            <div className="block-content">
              {data.events.map((event, idx) => (
                <p key={idx}>→ {event}</p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </aside>
  );
};

export default RouteSummaryPanel;
