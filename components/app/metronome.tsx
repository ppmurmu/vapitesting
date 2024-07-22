// components/Metronome.tsx
import { useState, useRef, useEffect } from 'react';

interface MetronomeProps {
    isPlaying: boolean;
    bpm : number;
  }

const Metronome: React.FC<MetronomeProps>= ({isPlaying, bpm}) => {
    //const [bpm, setBpm] = useState<number>(60);
   
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);

    const startMetronome = () => {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      
        playTick();
    };

    useEffect(() => {
        if (isPlaying) {
          startMetronome();
        } else {
          stopMetronome();
        }
       // return () => stopMetronome();
      }, [isPlaying]);
    

    const stopMetronome = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        if (audioContextRef.current) {
            audioContextRef.current.close();
        }
    };

    const playTick = () => {
        const interval = 60000 / bpm;
        intervalRef.current = setInterval(() => {
            const context = audioContextRef.current!;
            const oscillator = context.createOscillator();
            const gainNode = context.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(context.destination);

            oscillator.frequency.value = 400; // Frequency of the tick sound
            gainNode.gain.setValueAtTime(1, context.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.1);

            oscillator.start(context.currentTime);
            oscillator.stop(context.currentTime + 0.1);
        }, interval);
    };

    // const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setBpm(parseInt(e.target.value, 10));
    // };

    

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Metronome</h1>
            <label>BPM:{bpm} </label>

           
        </div>
    );
};

export default Metronome;
