import React from 'react';
import './ActionButton.scss';

export type ButtonColor = 'red' | 'green' | 'blue';

interface ActionButtonProps {
  text: string;
  color: ButtonColor;
  onClick?: () => void;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ text, color, onClick, className }) => {
  return (
    <button 
      className={`action-button color-${color} ${className || ''}`} 
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ActionButton;
