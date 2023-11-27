const apiKey = "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";
const apiUrl = "https://api.openai.com/v1/chat/completions";
const chatContainer = document.querySelector(".chatContainer");
const chatForm = document.querySelector(".chatForm");
const input = document.querySelector("input");
const msgList = document.querySelector("ul");
const submitBtn = document.querySelector(".submitBtn");
const toggleBtn = document.querySelector(".toggleChat");
const container = document.querySelector(".container");

const submitForm = (e) => {
  e.preventDefault();
  const inputValue = input.value;
  input.value = "";

  const newParagraph = document.createElement("p");
  newParagraph.textContent = inputValue;

  const newMsg = document.createElement("li");
  newMsg.appendChild(newParagraph);
  newMsg.className = "sentMsg msg";

  msgList.appendChild(newMsg);

  chatContainer.scrollTop = msgList.scrollHeight;
  submitBtn.disabled = true;

  const newResParagraph = document.createElement("p");
  newResParagraph.textContent = "thinking...";

  const itemList = document.createElement("li");
  itemList.className = "comingMsg msg";
  itemList.appendChild(newResParagraph);

  msgList.appendChild(itemList);
  chatContainer.scrollTop = msgList.scrollHeight;

  // Get the answers from open ai

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: inputValue }],
    }),
  };

  fetch(apiUrl, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      newResParagraph.textContent = data.choices[0].message.content;
      chatContainer.scrollTop = msgList.scrollHeight;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

input.addEventListener("input", () => {
  submitBtn.disabled = !input.value.trim();
});

const toggleForm = () => {
  container.style.display =
    container.style.display === "none" || container.style.display === ""
      ? "block"
      : "none";
};

chatForm.addEventListener("submit", submitForm);
toggleBtn.addEventListener("click", toggleForm);

chatContainer.scrollTop = chatContainer.scrollHeight;
