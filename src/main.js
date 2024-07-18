const xanoClient = new XanoClient({
  instanceBaseUrl: "http://x8ki-letl-twmt.n7.xano.io/",
  realtimeConnectionHash: "9Xy9Tb4aWRCeJNyVSeK8QFBGn60",
});

const mainChannel = xanoClient.channel("main");
const messageHistory = [];

// Receive message
mainChannel.on((message) => {
  switch (message.action) {
    case 'message':
      messageReceived(message.payload);
      messageHistory.push(message.payload); // Add message to history
      displayMessage(message.payload);
      break;
    default:
      console.log('log:' + message);
  }
}, (error) => {
  console.error("Error receiving message:", error);
});

const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messageList = document.getElementById('messageList');

// Send message
sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  mainChannel.message(message);
  messageInput.value = ''; // Clear input field
});

function messageReceived(message) {
  // You might have some other logic here, but make sure to call displayMessage!
  displayMessage(message);
}

function displayMessage(message) {
  const maxMessages = 10; // Limit the number of messages displayed
  const messagesToDisplay = messageHistory.slice(-maxMessages);
  messageList.innerHTML = ''; // Clear the list

  messagesToDisplay.forEach((message) => {
    const messageHTML = `<p>${message}</p>`;
    messageList.insertAdjacentHTML('beforeend', messageHTML);
  });

  // Check if the user is scrolled to the bottom
  const isScrolledToBottom = messageList.scrollTop + messageList.offsetHeight >= messageList.scrollHeight;

  // Scroll to the bottom if the user was scrolled to the bottom before
  if (isScrolledToBottom) {
    messageList.scrollTop = messageList.scrollHeight;
  }
}
