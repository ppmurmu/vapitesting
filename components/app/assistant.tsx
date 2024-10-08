"use client";

import { useVapi } from "../../hooks/useVapi";
import { AssistantButton } from "./assistantButton";
import { Display } from "./display";

function Assistant() {
  const { toggleCall, callStatus, audioLevel } = useVapi();
  return (
    <>
     <div className="user-input">
        <AssistantButton
          audioLevel={audioLevel}
          callStatus={callStatus}
          toggleCall={toggleCall}
        ></AssistantButton>
      </div>
      <div className="chat-history">
        <Display />
      </div>
     
    </>
  );
}

export { Assistant };
