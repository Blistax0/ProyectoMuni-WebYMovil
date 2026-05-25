import React from 'react';
import './StepIndicator.scss';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="step-indicator-container">
      <div className="step-progress-bg">
        <div className="step-progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default StepIndicator;
