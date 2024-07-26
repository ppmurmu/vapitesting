import { CALL_STATUS, useVapi } from "@/hooks/useVapi";
import { Loader2, Mic, Square } from "lucide-react";
import { Button } from "../ui/button";
const AssistantButton = ({
  toggleCall,
  callStatus,
  audioLevel = 0,
}: Partial<ReturnType<typeof useVapi>>) => {
  const color =
    callStatus === CALL_STATUS.ACTIVE
      ? "red"
      : callStatus === CALL_STATUS.LOADING
      ? "orange"
      : "transparent";
  
  const buttonStyle = {
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    color: "white",
    border: "none",
    boxShadow: callStatus !== undefined ? `1px 1px ${10 + audioLevel * 40}px ${
      audioLevel * 10
    }px ${color}` : "none",
    backgroundColor:
      callStatus === CALL_STATUS.ACTIVE
        ? "red"
        : callStatus === CALL_STATUS.LOADING
        ? "orange"
        : "transparent",
    cursor: "pointer",
  };

 




  return (
    <div>
   
      {callStatus === CALL_STATUS.ACTIVE ? (
        <Button
        style={buttonStyle}
        className={`transition ease-in-out ${
          
             "bg-red-500 hover:bg-red-700"
           
        } flex items-center justify-center`}
        onClick={toggleCall}
      >
        <Square />
        </Button>
      ) : callStatus === CALL_STATUS.LOADING ? (
        <button   onClick={toggleCall} className={`transition ease-in-out ${"bg-orange-500 hover:bg-orange-700"}  flex items-center justify-center`}>
 <Loader2 className="animate-spin" />
        </button>
       
      ) : (
        <button  onClick={toggleCall} >
        <img src="/button_main.png"  style={{ width: '120px', height: '120px' }} />
        </button>
      )}
      </div>
   
  );
};

export { AssistantButton };



// <Button
// style={buttonStyle}
// className={`transition ease-in-out ${
//   callStatus === CALL_STATUS.ACTIVE
//     ? "bg-red-500 hover:bg-red-700"
//     : callStatus === CALL_STATUS.LOADING
//     ? "bg-orange-500 hover:bg-orange-700"
//     : ""
// } flex items-center justify-center`}
// onClick={toggleCall}
// >