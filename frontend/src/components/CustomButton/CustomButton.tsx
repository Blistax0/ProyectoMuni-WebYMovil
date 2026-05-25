import React from 'react';
import './CustomButton.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'select-orange' | 'select-blue';
export type ButtonSize = 'large' | 'medium' | 'compact';

interface CustomButtonProps {
  text: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ 
  text, 
  onClick, 
  variant = 'primary',
  size = 'large',
  type = 'button',
  disabled = false 
}) => {
  const classes = `custom-button variant-${variant} size-${size}`;

  return (
    <button 
      className={classes}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default CustomButton;
