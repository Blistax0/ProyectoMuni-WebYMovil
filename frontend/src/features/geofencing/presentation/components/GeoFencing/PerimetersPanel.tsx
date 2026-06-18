import React from 'react';
import { Geofence } from '../../../domain/repositories/GeofencingRepository';
import './PerimetersPanel.scss';

interface PerimetersPanelProps {
  isDrawingMode: boolean;
  onToggleDrawing: () => void;
  geofences: Geofence[];
  onDelete: (id: number) => void;
  onSave?: (name: string) => void;
  canSave?: boolean;
}

const PerimetersPanel: React.FC<PerimetersPanelProps> = ({
  isDrawingMode, onToggleDrawing, geofences, onDelete, onSave, canSave
}) => {
  // Los patrols siguen siendo estáticos según requerimiento
  const defaultPatrols = ['Patrulla 3', 'Patrulla 6'];
  const [zoneName, setZoneName] = React.useState('');

  React.useEffect(() => {
    if (!isDrawingMode) {
      setZoneName('');
    }
  }, [isDrawingMode]);

  return (
    <aside className="perimeters-panel">
      <div className="panel-container">
        <h2 className="panel-title">Gestión de Perímetros</h2>

        <div className="zones-list">
          {geofences.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>No hay geocercas activas.</div>
          ) : (
            geofences.map(zone => (
              <div key={zone.id} className="zone-card">
                <div className="zone-header" style={{ borderLeft: `5px solid ${zone.color_borde}` }}>
                  <h3>{zone.nombre_zona}</h3>
                  <button onClick={() => onDelete(zone.id)} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontSize: '12px' }}>Eliminar</button>
                </div>
                <div className="zone-body">
                  <p className="label">Unidades Asignadas:</p>
                  <div className="patrols-list">
                    {defaultPatrols.map(p => (
                      <span key={p}>→ {p}</span>
                    ))}
                  </div>
                  <div className="status-badge" style={{ backgroundColor: zone.activa ? '#e3fceb' : '#ffeeee', color: zone.activa ? '#17a23c' : '#d42121' }}>
                    {zone.activa ? 'Activa' : 'Inactiva'}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="free-patrols">
          <p className="label">Unidades en patrullaje libre:</p>
          <p className="value">Patrulla 1 - Patrulla 2 - Patrulla 5</p>
        </div>

        <div className="actions-container" style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
          {isDrawingMode && (
            <>
              <div style={{ marginBottom: '5px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Nombre de la Zona</label>
                <input
                  type="text"
                  value={zoneName}
                  onChange={e => setZoneName(e.target.value)}
                  placeholder="Ej: Zona Residencial"
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                />
              </div>
              <button
                className="action-btn draw"
                onClick={() => onSave && onSave(zoneName || `Zona ${geofences.length + 1}`)}
                disabled={!canSave}
                style={{ opacity: canSave ? 1 : 0.5, backgroundColor: '#28a745' }}
              >
                Guardar Perímetro
              </button>
            </>
          )}
          <button
            className={`action-btn ${isDrawingMode ? 'cancel' : 'draw'}`}
            onClick={onToggleDrawing}
          >
            {isDrawingMode ? 'Cancelar' : 'Trazar Nuevo Perímetro'}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default PerimetersPanel;
