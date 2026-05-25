import React from 'react';
import './PerimetersPanel.scss';

interface PerimetersPanelProps {
  isDrawingMode: boolean;
  onToggleDrawing: () => void;
}

const PerimetersPanel: React.FC<PerimetersPanelProps> = ({ isDrawingMode, onToggleDrawing }) => {
  const zones = [
    {
      id: 1,
      name: 'Zona Centro-Costa',
      patrols: ['Patrulla 3', 'Patrulla 6'],
      status: 'Activa'
    },
    {
      id: 2,
      name: 'Zona Sur - Condominio',
      patrols: ['Patrulla 4'],
      status: 'Activa'
    }
  ];

  return (
    <aside className="perimeters-panel">
      <div className="panel-container">
        <h2 className="panel-title">Gestión de Perímetros</h2>
        
        <div className="zones-list">
          {zones.map(zone => (
            <div key={zone.id} className="zone-card">
              <div className="zone-header">
                <h3>{zone.name}</h3>
              </div>
              <div className="zone-body">
                <p className="label">Unidades Asignadas:</p>
                <div className="patrols-list">
                  {zone.patrols.map(p => (
                    <span key={p}>→ {p}</span>
                  ))}
                </div>
                <div className="status-badge">
                  {zone.status}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="free-patrols">
          <p className="label">Unidades en patrullaje libre:</p>
          <p className="value">Patrulla 1 - Patrulla 2 - Patrulla 5</p>
        </div>

        <button 
          className={`action-btn ${isDrawingMode ? 'cancel' : 'draw'}`}
          onClick={onToggleDrawing}
        >
          {isDrawingMode ? 'Cancelar' : 'Trazar Nuevo Perímetro'}
        </button>
      </div>
    </aside>
  );
};

export default PerimetersPanel;
