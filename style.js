// const chatMessages = document.getElementById("chatMessages");
// const userInput = document.getElementById("userInput");
// const imageUpload = document.getElementById("imageUpload");
// fetch()
// const API_URL = "http://127.0.0.1:5000"; // Flask backend

// // ---------------- Send Text Message ----------------
// async function sendMessage() {
//   const text = userInput.value.trim();
//   if (!text) return;

//   addMessage("user", text);
//   userInput.value = "";

//   try {
//     const formData = new FormData();
//     formData.append("text", text);

//     const response = await fetch(`${API_URL}/ask`, {
//       method: "POST",
//       body: formData
//     });
//     const data = await response.json();

//     addMessage("bot", data.answer || "🌾यह वह जगह है जहाँ सलाह दिखाई देगी | This is where advisory will appear.");
//   } catch (error) {
//     console.error(error);
//     addMessage("bot", "❌ Error connecting to AI server.");
//   }
// }

// // ---------------- Add Message ----------------
// function addMessage(sender, content, isImage = false) {
//   const msg = document.createElement("div");
//   msg.className = `message ${sender}`;

//   if (isImage) {
//     const img = document.createElement("img");
//     img.src = content;
//     img.className = "chat-image";
//     msg.appendChild(img);
//   } else {
//     msg.textContent = content;
//   }

//   chatMessages.appendChild(msg);
//   chatMessages.scrollTop = chatMessages.scrollHeight;
// }

// // ---------------- Image Upload ----------------
// imageUpload.addEventListener("change", async (event) => {
//   const file = event.target.files[0];
//   if (!file) return;

//   // Show user image in chat
//   addMessage("user", URL.createObjectURL(file), true);

//   const formData = new FormData();
//   formData.append("image", file);

//   try {
//     const response = await fetch(`${API_URL}/image`, {
//       method: "POST",
//       body: formData
//     });
//     const data = await response.json();

//     addMessage("bot", `📷 Crop Health Analysis: ${data.disease_prediction}`);
//   } catch (error) {
//     console.error(error);
//     addMessage("bot", "❌ Error analyzing image.");
//   }
// });

// // ---------------- Voice Input ----------------
// function startVoice() {
//   if (!('webkitSpeechRecognition' in window)) {
//     alert("❌ Sorry, your browser does not support Speech Recognition.");
//     return;
//   }

//   const recognition = new webkitSpeechRecognition();
//   recognition.lang = "hi-IN"; // Change for multilingual (en-US, bn-IN, etc.)
//   recognition.interimResults = false;
//   recognition.maxAlternatives = 1;

//   recognition.start();

//   recognition.onresult = async function(event) {
//     const voiceText = event.results[0][0].transcript;
//     userInput.value = voiceText;

//     addMessage("user", voiceText);

//     const formData = new FormData();
//     formData.append("text", voiceText);

//     try {
//       const response = await fetch(`${API_URL}/ask`, {
//         method: "POST",
//         body: formData
//       });
//       const data = await response.json();

//       addMessage("bot", data.answer || "🌾यह वह जगह है जहाँ सलाह दिखाई देगी | This is where advisory will appear.");
//     } catch (error) {
//       console.error(error);
//       addMessage("bot", "❌ Error processing voice input.");
//     }
//   };

//   recognition.onerror = function(event) {
//     console.error("Speech recognition error", event.error);
//   };
// }

const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const imageUpload = document.getElementById("imageUpload");
const API_URL = "http://127.0.0.1:5000";

// ---------------- Send Text Message ----------------
async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage("user", text);
  userInput.value = "";

  addMessage("bot", "💬 Bot is typing..."); // Optional typing indicator

  try {
    const formData = new FormData();
    formData.append("text", text);

    const response = await fetch(`${API_URL}/ask`, { method: "POST", body: formData });
    const data = await response.json();

    // Remove typing indicator
    chatMessages.querySelector(".message.bot:last-child").remove();

    addMessage("bot", data.answer || "🌾 Advice will appear here.");
  } catch (error) {
    console.error(error);
    addMessage("bot", "❌ Error connecting to AI server.");
  }
}

// ---------------- Add Message ----------------
function addMessage(sender, content, isImage = false) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;

  if (isImage) {
    const img = document.createElement("img");
    img.src = content;
    img.className = "chat-image";
    msg.appendChild(img);
  } else {
    msg.textContent = content;
  }

  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ---------------- Image Upload ----------------
imageUpload.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  addMessage("user", URL.createObjectURL(file), true);

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(`${API_URL}/image`, { method: "POST", body: formData });
    const data = await response.json();
    addMessage("bot", `📷 Crop Analysis: ${data.disease_prediction}`);
  } catch (error) {
    console.error(error);
    addMessage("bot", "❌ Error analyzing image.");
  }
});
