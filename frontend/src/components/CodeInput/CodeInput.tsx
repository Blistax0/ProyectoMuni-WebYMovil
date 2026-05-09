import React, { useRef } from 'react';
import './CodeInput.scss';

interface CodeInputProps {
  length?: number;
  onChange?: (code: string) => void;
}

const CodeInput: React.FC<CodeInputProps> = ({ length = 4, onChange }) => {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInput = (e: React.FormEvent<HTMLInputElement>, index: number) => {
    const val = e.currentTarget.value;
    // Solo permitir números
    if (!/^\d*$/.test(val)) {
      e.currentTarget.value = "";
      return;
    }

    if (val && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    // Notificar cambio
    const code = inputs.current.map(i => i?.value || '').join('');
    if (onChange) onChange(code);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="code-input-container">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={el => inputs.current[i] = el}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          className="code-input-box"
          onInput={e => handleInput(e, i)}
          onKeyDown={e => handleKeyDown(e, i)}
        />
      ))}
    </div>
  );
};

export default CodeInput;
