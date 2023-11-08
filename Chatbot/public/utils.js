const chatHistory = [];

export default function getChatHistory(userMessage) {
  const formattedMessages = chatHistory.join('\n');
  return `${formattedMessages}\nYou: ${userMessage}\nBot:`;
}

function addToChatHistory(userMessage, botReply) {
  chatHistory.push(`You: ${userMessage}`, `Bot: ${botReply}`);
}



