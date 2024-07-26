import { Message, MessageTypeEnum } from "@/lib/types/conversation.type";
import { vapi,  } from "@/lib/vapi.sdk";
import React, { useEffect, useRef } from 'react';
import { useVapi } from "@/hooks/useVapi";


interface ExerciseComponentProps {
   // callStatus: CALL_STATUS;
    shouldPlay: boolean;
  //  tempo: string;
   
  }

 

  
  const ExerciseComponent: React.FC<ExerciseComponentProps> = ({  shouldPlay}) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    const { stop } = useVapi();

   
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
                content: `Exercise session has ended. Thank the user.
                `,
              },
            });

          //  setTimeout(() => {
          //     console.log("7 seconds done ")
             
          //     stop;
          //   }, 7000);
      
     
          
      
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


    }, [shouldPlay, stop])


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
      // <div className="flex gap-8 py-4">
    <div style={{ display: 'none' }}> 
        <audio ref={audioRef} controls src="/tabata30.mp3">
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </div>
    );
  };
  
  export { ExerciseComponent };