document.addEventListener("DOMContentLoaded", () => {
    const socket = io();

    const chatWindow = document.getElementById("chat-window");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-btn");
    const usernameInput = document.getElementById("username");

    let username;

    usernameInput.addEventListener("change", (event) => {
        username = event.target.value;
    });

    sendButton.addEventListener("click", () => {
        const message = messageInput.value.trim();
        if (message !== "") {
            socket.emit("chatMessage", { username, message });
            messageInput.value = "";
        }
    });

    socket.on("chatMessage", (data) => {
        const { username, message } = data;
        const messageElement = document.createElement("div");
        messageElement.innerHTML = `<strong>${username}:</strong> ${message}`;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    });
});
