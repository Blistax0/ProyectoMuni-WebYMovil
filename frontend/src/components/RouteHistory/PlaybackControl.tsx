import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { play, pause, playBack, playForward } from 'ionicons/icons';
import './PlaybackControl.scss';

interface PlaybackControlProps {
  startTime: string;
  endTime: string;
}

const PlaybackControl: React.FC<PlaybackControlProps> = ({ startTime, endTime }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(15); // Progreso inicial simulado

  return (
    <div className="playback-control-wrapper">
      <div className="playback-bar-container">
        <div className="time-labels">
          <span className="time-start">{startTime}</span>
          <span className="time-end">{endTime}</span>
        </div>

        <div className="progress-background">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="controls-group">
          <button className="control-btn side">
            <IonIcon icon={playBack} />
          </button>
          
          <button 
            className="control-btn main"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            <IonIcon icon={isPlaying ? pause : play} />
          </button>

          <button className="control-btn side">
            <IonIcon icon={playForward} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaybackControl;
