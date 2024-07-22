import { Message, MessageTypeEnum } from "@/lib/types/conversation.type";
import { vapi,  } from "@/lib/vapi.sdk";
import React, { useEffect, useRef } from 'react';
import { useVapi } from "@/hooks/useVapi";


interface ExerciseComponentProps {
   // callStatus: CALL_STATUS;
    shouldPlay: boolean;
  //  tempo: string;
    continu: boolean;
  }

  

  
  const ExerciseComponent: React.FC<ExerciseComponentProps> = ({  shouldPlay, continu}) => {
    const audioRef = useRef<HTMLAudioElement>(null);
  
    const handleAudioEnd = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.pause();
       
      }
      console.log('Audio has ended.-');
      vapi.send({
              type: MessageTypeEnum.ADD_MESSAGE,
              message: {
                role: "system",
                content: `Ask the user if they want to continue exercies or not.
                If user replies with No, then end the exercise and thank them for the session otherwise continue playing the exercise.
                `,
              },
            });

        

      
    };

    useEffect(()=> {
      if (audioRef.current) {
        if (shouldPlay) {
          audioRef.current.play();
          audioRef.current.volume = 1;
        } else {
          audioRef.current.pause();
        }
       audioRef.current.addEventListener('ended', handleAudioEnd);
    }

    // if(audioRef.current && continu)
    // {
    //   audioRef.current.currentTime = 0;
    //   audioRef.current.play();
    // }


    }, [shouldPlay])


    // if (audioRef.current) {
    //     if (shouldPlay) {
    //       audioRef.current.play();
    //       audioRef.current.volume = 0.5;
    //     } else {
    //       audioRef.current.pause();
    //     }

    //     audioRef.current.addEventListener('ended', handleAudioEnd);
    // }
   
    
  
    return (
      <div className="flex gap-8 py-4">
     {/* <div style={{ display: 'none' }}> */}
        <audio ref={audioRef} controls src={continu ? "/tabata30.mp3" : "/tabata20.mp3" }>
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </div>
    );
  };
  
  export { ExerciseComponent };