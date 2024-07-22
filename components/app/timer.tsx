import React, { useState, useEffect } from 'react';
import styles from './timerstyle.module.css'; // Import CSS module for styling
interface TimerComponentProps {
  isPlaying: boolean;
  reset: boolean;
  onReset: () => void;
  onTimeUpdate?: (time: number) => void;
}

const TimerComponent: React.FC<TimerComponentProps> = ({ isPlaying, reset,onReset, onTimeUpdate }) => {
  const [seconds, setSeconds] = useState(0);

  

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isPlaying) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else if (!isPlaying && seconds !== 0) {
      if (interval) {
        clearInterval(interval);
      }
    }
    //callback function to pass the time to parent
    if (onTimeUpdate) {
      onTimeUpdate(seconds);
    }

    //reset function
    if (reset) {
      setSeconds(0);
      onReset(); // Notify parent to toggle reset to false
    }


    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, reset, seconds, onTimeUpdate, onReset]);

  const resetTimer = () => {
    setSeconds(0);
  };

  return (
    <div className={styles.timerContainer}>
      <div className={styles.timerDisplay}>{seconds}</div>
    </div>
  );
};

export { TimerComponent };
