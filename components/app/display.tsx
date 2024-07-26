import { Message, MessageTypeEnum } from "@/lib/types/conversation.type";
import { vapi } from "@/lib/vapi.sdk";
import React, { useEffect, useState } from "react";
import styles from './timerstyle.module.css'; // Import CSS module for styling
import { TimerComponent } from "./timer";
import Metronome from "./metronome";
import { ExerciseComponent } from "./exercise";
import { useVapi } from "@/hooks/useVapi";
import { useCookies } from 'react-cookie';

function Display() {
 
  //this controls the display
  const [status, setStatus] = React.useState<"introduction" | "playExercise" | "pauseExercise" | "saveUser"  >(
    "introduction"
  );

  //------timer gere
  const [seconds, setSeconds] = useState(0);

  const [timerPlaying, setTimerPlaying] =useState(false);

  const [metronomePlaying, setMetronomePlaying] =useState(false);

  const [resetTimerValue, setResetTimerValue ] =useState(false);

  const [cookies, setCookie] = useCookies(['user']);

  const [continu, setContinu] = useState(false);
  const [feedback, setFeedback] = useState("");

  
  const { isSpeechActive, stop } = useVapi();

  const [ name, setName] = useState("");
  const [ age, setAge ]= useState("");
  const [ tempo, setTempo] = useState("high");

  
   
  
  
  //function to reset timer to 0
  const resetTimer = () => {
    setSeconds(0);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    console.log(isSpeechActive);
   // console.log("timer status", seconds)
    if (timerPlaying) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else if (!timerPlaying && seconds !== 0) {
      if (interval) {
        clearInterval(interval);
      }
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [seconds, timerPlaying, isSpeechActive]);
 
  
 


  // useEffect(() => {

    
   
  //   if (seconds === 40) {
    
  //     vapi.send({
  //       type: MessageTypeEnum.ADD_MESSAGE,
  //       message: {
  //         role: "system",
  //         content: `Tell user to take 20 seconds rest.`,
  //       },
  //     });
  //     setMetronomePlaying(false);
  //   }
  //    if(seconds === 60)
  //   {
      
  //     vapi.send({
  //       type: MessageTypeEnum.ADD_MESSAGE,
  //       message: {
  //         role: "system",
  //         content: `Start the push ups exercise`,
  //       },
  //     });
  //     setMetronomePlaying(true);

  //   }

  //   if (seconds === 100 ) {
  //     vapi.send({
  //       type: MessageTypeEnum.ADD_MESSAGE,
  //       message: {
  //         role: "system",
  //         content: `the exercise has ended. Tell user to take 10 seconds rest.`,
  //       },
  //     });
  //     setMetronomePlaying(false);

   
  //   }
  //   if (seconds === 120 ) {
  //     vapi.send({
  //       type: MessageTypeEnum.ADD_MESSAGE,
  //       message: {
  //         role: "system",
  //         content: `start the crunches exercise`,
  //       },
  //     });
  //     setMetronomePlaying(true);

   
  //   }
  //   if (seconds === 160 ) {
  //     vapi.send({
  //       type: MessageTypeEnum.ADD_MESSAGE,
  //       message: {
  //         role: "system",
  //         content: `the exercise has ended. Tell user to take 10 seconds rest.`,
  //       },
  //     });
  //     setMetronomePlaying(false);

   
  //   }
   
  //   if (seconds === 180 ) {
  //     vapi.send({
  //       type: MessageTypeEnum.ADD_MESSAGE,
  //       message: {
  //         role: "system",
  //         content: `the guided exercise session has ended. Say it was a great exercise and thank you for joining.`,
  //       },
  //     });
   
  //   }
  // }, [seconds]);
    
  const handleContinueFunction = () => {
   

  };
   

  

  useEffect(() => {
    
   
    const onMessageUpdate = (message: Message) => {
      if (
        message.type === MessageTypeEnum.FUNCTION_CALL &&
        message.functionCall.name === "introduction"
      ) {
        console.log("introduction");
        setStatus("introduction");
       
      }
      else if (
        message.type === MessageTypeEnum.FUNCTION_CALL &&
        message.functionCall.name === "saveUser"
      ) {
        const params = message.functionCall.parameters;
        setName(params.name.toLowerCase())
        setAge( params.age.toLowerCase()  );    
        setCookie('user', params.name, { path: '/', expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });
        setStatus("saveUser")
      } 
      // else if (
      //   message.type === MessageTypeEnum.FUNCTION_CALL &&
      //   message.functionCall.name === "chooseTempo"
      // ) {
      //   const params = message.functionCall.parameters;
      //   setTempo(params.tempo.toLowerCase())
       
        
      // } 
       else if (
        message.type === MessageTypeEnum.FUNCTION_CALL &&
        (
          message.functionCall.name === "playExercise")
      ) {
        
        //setTimerPlaying(true);
        setMetronomePlaying(true);
        setStatus("playExercise");        
      }
      else if (
        message.type === MessageTypeEnum.FUNCTION_CALL &&
        (
          message.functionCall.name === "pauseExercise")
      ) {

       //setTimerPlaying(false);
     
        setMetronomePlaying(false);
       
       
        setStatus(
          "pauseExercise"
        );
      
      }
      // else if (
      //   message.type === MessageTypeEnum.FUNCTION_CALL &&
      //   (
      //     message.functionCall.name === "continueOrEndExercise")
      // ) {
      //   setMetronomePlaying(false);
      //   console.log("continue or end exxercise phase")
       
      //   const params = message.functionCall.parameters;
      //   setContinu(params.continue)
      // }
      // else if (
      //   message.type === MessageTypeEnum.FUNCTION_CALL &&
      //   (
      //     message.functionCall.name === "saveFeedbackResponse")
      // ) {
        
      //     setMetronomePlaying(false);
      //   const params = message.functionCall.parameters;
      //   setFeedback(params.feedback)
      //   console.log(params.feedback)
      // }
      else if (
        message.type === MessageTypeEnum.FUNCTION_CALL &&
        (
          message.functionCall.name === "endExercise")
      ) {
       
          setMetronomePlaying(false);
          
          
        
      }
    };

    const reset = () => {
      setStatus("introduction");
      setMetronomePlaying(false);
      setTimerPlaying(false);

      // setResetTimerValue(true);
      // setTimerPlaying(false);
      //setShowList([]);
      //setSelectedShow(null);
    };

   
   
  
  


   

    vapi.on("message", onMessageUpdate);
    vapi.on("call-end", reset);
    return () => {
      vapi.off("message", onMessageUpdate);
      vapi.off("call-end", reset);
      
    };
  }, []);

  
  
  //---handling time
  //const handleTimeUpdate = (time: number) => {
    //   if(time===0)
    //   {
    //     setTimerPlaying(true)
    //   }
  
    //   if(time===20)
    //   {
       
    //       //vapi.say("Alright, 5 ,4 3, 2, 1", false)
    //       console.log("STUCK HERE STUCK HERE")
    //       vapi.send({
    //             type: MessageTypeEnum.ADD_MESSAGE,
    //             message: {
    //               role: "system",
    //               content: `the exercise is going to end. start to count 5,4,3,2,1`,
    //             },
    //           });
    //           console.log("EXECUTED VAPI SEND")
        
    //         }
    // };
 
    

  return (
    <>
      {/* <TimerComponent isPlaying={true} reset={resetTimerValue} onReset={handleReset}  onTimeUpdate={handleTimeUpdate} /> */}

      {/* <Metronome isPlaying={metronomePlaying} bpm={100}/> */}
      <ExerciseComponent shouldPlay={metronomePlaying && !isSpeechActive} 
      />
        
      
{/*      
      <div className={styles.timerContainer}>
      <div className={styles.timerDisplay}>{seconds}</div>
    </div>
     <h1>{name}</h1>
     <h1>{age}</h1>
     <h1>{tempo}</h1>
     
      {status == "playExercise" ? <h1>START STATE</h1> : null}
      {status == "introduction" ? <h1>INTRODUCTION</h1> : null}

     
      {status == "pauseExercise" ? <h1>PAUSE STATE</h1> : null} */}
    </>
  );
}

export { Display };
