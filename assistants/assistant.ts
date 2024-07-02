import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
import { shows } from "../data/shows";

export const assistant: CreateAssistantDTO | any = {
  name: "snacks",
  model: {
    provider: "openai",
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    systemPrompt: `You're snacks, an AI assistant who helps user with their fitness. User can ask you to suggest exercises and fitness tips. You can get the list of available shows from broadway and show them to the user, and then you can help user decide which ones to choose and which broadway theatre they can visit. After this confirm the details and book the tickets. `,
    // Upcoming Shows are ${JSON.stringify(
    //   shows
    // )}
    // `,
    functions: [
      {
        name: "suggestShows",
        async: true,
        description: "Suggests a list of routine",
        parameters: {
          type: "object",
          // properties: {
          //   location: {
          //     type: "string",
          //     description:
          //       "The location for which the user wants to see the shows.",
          //   },
          //   date: {
          //     type: "string",
          //     description:
          //       "The date for which the user wants to see the shows.",
          //   },
          // },
        },
      },
      // {
      //   name: "confirmDetails",
      //   async: true, // remove async to wait for BE response.
      //   description: "Confirms the details provided by the user.",
      //   parameters: {
      //     type: "object",
      //     properties: {
      //       show: {
      //         type: "string",
      //         description: "The show for which the user wants to book tickets.",
      //       },
      //       date: {
      //         type: "string",
      //         description:
      //           "The date for which the user wants to book the tickets.",
      //       },
      //       location: {
      //         type: "string",
      //         description:
      //           "The location for which the user wants to book the tickets.",
      //       },
      //       numberOfTickets: {
      //         type: "number",
      //         description: "The number of tickets that the user wants to book.",
      //       },
      //     },
      //   },
      // },
      {
        name: "bookTickets",
        async: true, // remove async to wait for BE response.
        description: "Books tickets for the user.",
        parameters: {
          type: "object",
          properties: {
            show: {
              type: "string",
              description: "The show for which the user wants to book tickets.",
            },
            date: {
              type: "string",
              description:
                "The date for which the user wants to book the tickets.",
            },
            location: {
              type: "string",
              description:
                "The location for which the user wants to book the tickets.",
            },
            numberOfTickets: {
              type: "number",
              description: "The number of tickets that the user wants to book.",
            },
          },
        },
      },
    ],
  },
  voice: {
    provider: "11labs",
    voiceId: "paula",
  },
  firstMessage:
    "Hi. I'm Snacks, Welcome to personal fitness assistant! How are u feeling today?",
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "https://08ae-202-43-120-244.ngrok-free.app/api/webhook",
};
