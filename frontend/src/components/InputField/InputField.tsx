import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import './InputField.scss';

interface InputFieldProps {
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'number';
  icon?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ 
  label,
  placeholder = '',
  type = 'text',
  icon,
  value = '', 
  onChange
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  // Determinamos el estado visual:
  // - "focused" si está siendo editado
  // - "filled" si no está enfocado pero tiene contenido
  // - "default" si está vacío y no enfocado
  const variantClass = isFocused ? 'variant-focused' : (internalValue ? 'variant-filled' : 'variant-default');

  return (
    <div className={`input-container ${variantClass}`}>
      <div className="label-container">
        <label>{label}</label>
      </div>
      
      <div className="input-wrapper">
        <input
          type={type}
          value={internalValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
        />
        {icon && (
          <div className="icon-container">
            <IonIcon icon={icon} />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
