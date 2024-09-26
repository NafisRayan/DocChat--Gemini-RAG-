import { GoogleGenerativeAI } from "@google/generative-ai";
import readline from 'readline';

const apiKey = "AIzaSyD_SyHYr-ZLhl4vfDQqSHmgIGOGp-HJdT8";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: "Hello" }],
    },
    {
      role: "model",
      parts: [{ text: "Great to meet you. What would you like to know?" }],
    },
  ],
});

// Initialize chat history if it doesn't exist
if (!chat.history) {
  chat.history = [];
}

// Function to send a message and update chat history
async function sendMessageAndUpdateHistory(message) {
  let result = await chat.sendMessage(message);
  console.log("Model:", result.response.text());

  // Append user message to chat history
  chat.history.push({
    role: "user",
    parts: [{ text: message }],
  });

  // Append model response to chat history
  chat.history.push({
    role: "model",
    parts: [{ text: result.response.text() }],
  });

  return result.response.text();
}

// Create readline interface for terminal input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to prompt for user input
function promptUser() {
  rl.question('You: ', async (input) => {
    await sendMessageAndUpdateHistory(input);
    promptUser(); // Ask for the next input
  });
}

// Start the chat
promptUser();
