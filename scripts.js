const chatContainer = document.getElementById("chat-container");
const messageInput = document.getElementById("message-input");
const typingIndicator = document.getElementById("typing-indicator");
const apiProcessingIndicator = document.getElementById(
  "api-processing-indicator"
);
const loginContainer = document.getElementById("login-container");
const chatApp = document.getElementById("chat-app");
const usernameInput = document.getElementById("username-input");

let typingTimeout;
let currentUser;

const prebuiltReplies = [
  "Hello! How can I help you today?",
  "I'm just a bot, but I'm here to assist!",
  "Can you tell me more about that?",
  "Interesting! Tell me more.",
  "What else would you like to discuss?",
  "I'm here to chat anytime!",
  "Feel free to ask me anything.",
  "That's cool! What else?",
  "Do you have any other questions?",
  "I'm listening, go on.",
  "That's a great point!",
  "Absolutely, I agree.",
  "I see what you mean.",
  "Can you elaborate on that?",
  "I'm here for you!",
  "Tell me more about your day.",
  "What's on your mind?",
  "How can I assist you further?",
  "I'm here to help with whatever you need.",
  "Is there something specific you'd like to know?",
  "I'm happy to chat with you!",
  "That sounds fascinating!",
  "I'd love to hear more about that.",
  "That's very interesting!",
  "Tell me more about your thoughts.",
  "What do you think about that?",
  "How does that make you feel?",
  "Let's discuss that further.",
  "I'm curious to hear more!",
  "What are your thoughts on this?",
];

function handleLoginKey(event) {
  if (event.key === "Enter") {
    login();
  }
}

function handleTyping(event) {
  if (event.key === "Enter") {
    sendMessage();
    return;
  }
  showTypingIndicator();
}

function showTypingIndicator() {
  typingIndicator.classList.add("active");
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    typingIndicator.classList.remove("active");
  }, 2000);
}

function sendMessage() {
  const messageText = messageInput.value.trim();
  if (messageText === "") return;

  console.log("Sending message:", messageText);

  const timestamp = formatTimestamp(new Date());
  const message = {
    user: currentUser,
    text: messageText,
    timestamp: timestamp,
    avatar: "EmptyProfilePic.webp",
  };

  // Save message to local storage
  saveMessage(message);

  // Create message element
  const messageElement = createMessageElement(message);

  // Append message to chat container
  chatContainer.appendChild(messageElement);

  // Scroll to bottom
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // Clear input field
  messageInput.value = "";

  // Simulate a reply
  simulateReply();
}

function simulateReply() {
  // Show typing indicator for simulated reply
  showTypingIndicator();

  setTimeout(() => {
    const randomReply =
      prebuiltReplies[Math.floor(Math.random() * prebuiltReplies.length)];
    const message = {
      user: "AI",
      text: randomReply,
      timestamp: formatTimestamp(new Date()),
      avatar: "chatbot_profile.png",
    };
    receiveMessage(message);
  }, 2000);
}

function receiveMessage(message) {
  console.log("Received message:", message.text);

  // Save message to local storage
  saveMessage(message);

  const messageElement = createMessageElement(message);

  chatContainer.appendChild(messageElement);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // Hide typing indicator after receiving message
  hideApiProcessingIndicator();
}

function formatTimestamp(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const strTime =
    hours + ":" + (minutes < 10 ? "0" + minutes : minutes) + " " + ampm;
  return strTime;
}

function login() {
  const username = usernameInput.value.trim();
  if (username === "") return;

  currentUser = username;
  loginContainer.style.display = "none";
  chatApp.style.display = "flex";

  console.log("User logged in as:", username);

  // Load messages from local storage
  loadMessages();
}

function createMessageElement(message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add(
    "message",
    message.user === currentUser ? "user" : "other"
  );
  messageElement.innerHTML = `
        <img src="${
          message.avatar || "EmptyProfilePic.webp"
        }" class="avatar" alt="User Avatar">
        <div>
            <div>${message.text}</div>
            <div class="timestamp">${message.timestamp}</div>
        </div>
    `;
  return messageElement;
}

function saveMessage(message) {
  const messages = JSON.parse(localStorage.getItem("messages")) || [];
  messages.push(message);
  localStorage.setItem("messages", JSON.stringify(messages));
}

function loadMessages() {
  const messages = JSON.parse(localStorage.getItem("messages")) || [];
  messages.forEach((message) => {
    const messageElement = createMessageElement(message);
    chatContainer.appendChild(messageElement);
  });
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function hideApiProcessingIndicator() {
  apiProcessingIndicator.classList.remove("active");
}
