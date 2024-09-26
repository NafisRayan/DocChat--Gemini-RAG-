import { GoogleGenerativeAI } from "@google/generative-ai";

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

async function sendMessageAndUpdateHistory(message) {
  // Send user message
  let result = await chat.sendMessage(message);
  console.log("Model:", result.response.text());

  // Initialize chat.history if it doesn't exist
  if (!chat.history) {
    chat.history = [];
  }

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

// Example usage
async function main() {
  await sendMessageAndUpdateHistory("I have 2 dogs in my house.");
  await sendMessageAndUpdateHistory("How many paws are in my house?");
  
  // You can continue to send messages like this
  await sendMessageAndUpdateHistory("What are their names?");
}

main();
