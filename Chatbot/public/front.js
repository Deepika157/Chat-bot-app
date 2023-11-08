const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");

let userMessage;
const createChatLi = (message, className) => {
  // Create a chat <li> element with passed message and className
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent =
    className === "outgoing"
      ? `<p>${message}</p>`
      : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
  chatLi.innerHTML = chatContent;
  return chatLi;
};

const handleChat = (data, type) => {
  userMessage = data.trim(); // Get user entered message and remove extra whitespace
  if (!userMessage) return;

  chatbox.appendChild(createChatLi(userMessage, type));
};
//sendChatBtn.addEventListener("click", handleChat);
function submit() {
  const data = chatInput.value.trim();
  fetch("http://localhost:8000/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: data }),
  })
    .then((response) => response.text())
    .then((outgoingc) => {
      handleChat("You: " + data, "outgoing");
      handleChat(outgoingc, "incoming");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
sendChatBtn.addEventListener("click", submit);