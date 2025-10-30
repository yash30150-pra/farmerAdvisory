// ---------------- MOBILE MENU ----------------
const hamburger = document.querySelector(".hamburger");
const mobileMenuContainer = document.querySelector(".mobile-menu-container");
const mobileBackdrop = document.querySelector(".mobile-menu-backdrop");

hamburger.addEventListener("click", () => {
  mobileMenuContainer.classList.toggle("open");
});

mobileBackdrop.addEventListener("click", () => {
  mobileMenuContainer.classList.remove("open");
});

// ---------------- LANGUAGE SELECT ----------------
const langSelect = document.querySelector("#langSelect");
langSelect?.addEventListener("change", (e) => {
  alert(`Language changed to: ${e.target.value}`);
  // Add your dynamic translation logic here
});

// ---------------- CHATBOT SIMULATION ----------------
const userInput = document.getElementById("userInput");
const chatMessages = document.getElementById("chatMessages");

function appendMessage(message, type = "user") {
  const msg = document.createElement("div");
  msg.className = `chat-msg ${type}`;
  msg.textContent = message;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  appendMessage(text, "user");
  userInput.value = "";

  // Simulated AI reply (replace with your API fetch if needed)
  setTimeout(() => {
    appendMessage(`AI says: "${text.split("").reverse().join("")}"`, "ai");
  }, 800);
}

document.getElementById("sendBtn").addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

// ---------------- REVEAL ANIMATIONS ----------------
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  reveals.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) el.classList.add("visible");
  });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
