import React from 'react';
import { IonIcon } from '@ionic/react';
import { navigateOutline, shapesOutline, trashOutline } from 'ionicons/icons';
import './DrawingTools.scss';

export type ToolType = 'pointer' | 'polygon';

interface DrawingToolsProps {
  isVisible: boolean;
  activeTool: ToolType;
  onSelectTool: (tool: ToolType) => void;
  onUndo: () => void;
  color: string;
  onColorChange: (color: string) => void;
  hasPoints: boolean;
}

const DrawingTools: React.FC<DrawingToolsProps> = ({ 
  isVisible, activeTool, onSelectTool, onUndo, color, onColorChange, hasPoints 
}) => {
  const [showColorMenu, setShowColorMenu] = React.useState(false);

  if (!isVisible) return null;

  const colors = [
    { value: '#1e88e5', label: 'Azul' },
    { value: '#e53935', label: 'Rojo' },
    { value: '#28a745', label: 'Verde' }
  ];

  const handleColorSelect = (c: string) => {
    onColorChange(c);
    setShowColorMenu(false);
  };

  return (
    <div className="drawing-tools-sidebar">
      <button 
        className={`tool-btn ${activeTool === 'pointer' ? 'active' : ''}`}
        onClick={() => onSelectTool('pointer')}
        title="Mover mapa"
      >
        <IonIcon icon={navigateOutline} />
      </button>

      <button 
        className={`tool-btn ${activeTool === 'polygon' ? 'active' : ''}`}
        onClick={() => onSelectTool('polygon')}
        title="Dibujar polígono"
      >
        <IonIcon icon={shapesOutline} />
      </button>

      <button 
        className="tool-btn"
        onClick={onUndo}
        disabled={!hasPoints}
        title="Deshacer último punto"
      >
        <IonIcon icon={trashOutline} />
      </button>

      <div className="color-picker-container" style={{ position: 'relative' }}>
        <button 
          className="tool-btn color-btn"
          onClick={() => setShowColorMenu(!showColorMenu)}
          title="Color de la zona"
        >
          <div className="color-indicator" style={{ backgroundColor: color }}></div>
        </button>
        
        {showColorMenu && (
          <div className="color-menu">
            {colors.map(c => (
              <button 
                key={c.value}
                className="color-circle"
                style={{ backgroundColor: c.value }}
                onClick={() => handleColorSelect(c.value)}
                title={c.label}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DrawingTools;
