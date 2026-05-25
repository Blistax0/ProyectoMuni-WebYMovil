import React from 'react';
import { IonIcon } from '@ionic/react';
import { navigateOutline, shapesOutline, ellipseOutline, trashOutline } from 'ionicons/icons';
import './DrawingTools.scss';

interface DrawingToolsProps {
  isVisible: boolean;
}

const DrawingTools: React.FC<DrawingToolsProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  const tools = [
    { id: 'pointer', icon: navigateOutline },
    { id: 'polygon', icon: shapesOutline },
    { id: 'circle', icon: ellipseOutline },
    { id: 'delete', icon: trashOutline },
  ];

  return (
    <div className="drawing-tools-sidebar">
      {tools.map(tool => (
        <button key={tool.id} className="tool-btn">
          <IonIcon icon={tool.icon} />
        </button>
      ))}
    </div>
  );
};

export default DrawingTools;
