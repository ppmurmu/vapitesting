import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
import { shows } from "../data/shows";

// At the end of the session, ask the user if they want to continue or not. when said yes, continue otherwise
//thank the user and ask for feedback.

export const createOldAssistant = (name: string): CreateAssistantDTO  | any => {
  return {
    name: "Paula-broadway",
    model: {
      //provider: "openai",
      //model: "gpt-3.5-turbo",
      provider: "groq",
      model: "llama3-70b-8192",
      temperature: 0.4,
      systemPrompt: `
      [Identity]
      You're Snacks, an AI Voice assistant who helps users with their fitness session.

    [Task]
    1. Say "Today's session is 4 minutes long, are you ready to start the exercise?". Ask user if they are ready to start the exercise. 
    <wait for user response>
    2. If the answer is yes, then start the exercise, use playExercise function.
    3. If during the session, user asks questions or says to pause, use pauseExercise function.  
      `,
      
     
      functions: [
        {
          name: "introduction",
          async: true,
          description: "General conversation around health and fitness",
        },
  
        {
          name: "playExercise",
          async: true,
          description: "start exercise when user says yes. also play when user says to continue after it has been paused ",
        },
        {
          name: "pauseExercise",
          async: true,
          description: "Pause the exercise when user says to pause or stop",
        },
        // {
        //   name: "saveUser",
        //   description: "Save user name and age",
        //   parameters: {
        //     type: "object",
        //     properties: {
        //       name: {
        //         type: "string",
        //         description: "Name of the user"
        //       },
        //       age: {
        //         type: "string",
        //         description: "Age of the user"
        //       }
        //     }
        //   }
        // },
        // {
        //   name: "chooseTempo",
        //   description: "Choose tempo of exercise",
        //   parameters: {
        //     type: "object",
        //     properties: {
        //       tempo: {
        //         type: "string",
        //         description: "tempo chosen by user"
        //       },
             
        //     }
        //   }
        // } ,
        // {
        //   name: "continueOrEndExercise",
        //   description: "At the end of the session, Ask if the user wants to continue the exercise or end it",
        //   parameters: {
        //     type: "object",
        //     properties: {
        //       continue: {
        //         type: "boolean",
        //         description: "true for continue and false to end it"
        //       },
             
        //     }
        //   }
        // } ,
        {
          name: "saveFeedbackResponse",
          description: "When asked for feedback, save the user's reply",
          parameters: {
            type: "object",
            properties: {
              feedback: {
                type: "string",
                description: "reply of the user"
              },
            }
          }
        } 
      ],
    },
    voice: {
      provider: "11labs",
      voiceId: "c1TwtutEsY1m44dV1Bur",
    },
    //adam voice calm
    firstMessage:
    `Hey ${name}! Welcome back. How are you feeling today?`,
    
    serverUrl: process.env.NEXT_PUBLIC_SERVER_URL
      ? process.env.NEXT_PUBLIC_SERVER_URL
      : "https://08ae-202-43-120-244.ngrok-free.app/api/webhook",
    //serveUrl :"https://08ae-202-43-120-244.ngrok-free.app/api/webhook",
    silenceTimeoutSeconds: 300,
    maxDurationSeconds: 1800
  }
};




export const newAssistant: CreateAssistantDTO | any  = {
  name: "Paula-broadway",
  model: {
    provider: "openai",
    model: "gpt-3.5-turbo",
   // provider: "groq",
     // model: "llama3-70b-8192",
    temperature: 0.7,
    systemPrompt: `You're snacks, an AI assitant who helps users with their fitness. Your role is to provide guided fitness training.
    [Task]
    1. Ask for user's name and age
    <wait for user response>
    2.  Say "Today's session is 4 minutes long, are you ready to start the exercise?". Ask user if they are ready to start the exercise.
    <wait for user response>
    3. If the answer is yes, then start the exercise, use playExercise function.
    4. If during the session, user asks questions or says to pause, use pauseExercise function.  
    `,
  
    functions: [
      {
        name: "introduction",
        async: true,
        description: "General conversation around health and fitness",
      },

      {
        name: "playExercise",
        async: true,
        description: "start exercise when user says yes. also play when user says to continue after it has been paused ",
      },
      {
        name: "pauseExercise",
        async: true,
        description: "Pause the exercise when user says to pause or stop",
      },
      {
        name: "saveUser",
        description: "Save user name and age",
        parameters: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of the user"
            },
            age: {
              type: "string",
              description: "Age of the user"
            }
          }
        }
      },
      // {
      //   name: "chooseTempo",
      //   description: "Choose tempo of exercise",
      //   parameters: {
      //     type: "object",
      //     properties: {
      //       tempo: {
      //         type: "string",
      //         description: "tempo chosen by user"
      //       },
           
      //     }
      //   }
      // },
      // {
      //   name: "continueOrEndExercise",
      //   description: "At the end of the session, ask if the user wants to continue the exercise or end it",
      //   parameters: {
      //     type: "object",
      //     properties: {
      //       continue: {
      //         type: "boolean",
      //         description: "true for continue and false to end it"
      //       },
           
      //     }
      //   }
      // }  
      {
        name: "saveFeedbackResponse",
        description: "When asked for feedback, save the user's reply",
        parameters: {
          type: "object",
          properties: {
            feedback: {
              type: "string",
              description: "reply of the user"
            },
          }
        }
      } 
    ],
  },
  voice: {
    provider: "11labs",
    voiceId: "c1TwtutEsY1m44dV1Bur",
  },
  //adam voice calm
  firstMessage:
    "Hi. I'm Snacks, your workout buddy! How are u feeling today?",
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "https://08ae-202-43-120-244.ngrok-free.app/api/webhook",
  //serveUrl :"https://08ae-202-43-120-244.ngrok-free.app/api/webhook",
  silenceTimeoutSeconds: 300,
  maxDurationSeconds: 1800

};
