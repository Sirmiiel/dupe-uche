document.addEventListener("DOMContentLoaded", function () {
    // Fetch existing messages from the backend
    fetch("http://localhost:3000/api/messages")
      .then(response => response.json())
      .then(messages => {
        const messagesContainer = document.querySelector("#messages .messages_messagesContainer__GtH6I");
  
        // Iterate over each message and display it
        messages.forEach(message => {
          const messageContainer = document.createElement("div");
          messageContainer.classList.add("message");
          messageContainer.innerHTML = `<strong>${message.name}</strong>: ${message.message}`;
          
          // Append the message to the messages container
          messagesContainer.appendChild(messageContainer);
        });
      })
      .catch(error => console.error("Error fetching messages:", error));
  });
  
  document.getElementById("noteForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from reloading the page
    
    const name = document.getElementById("noteAuthor").value;
    const message = document.getElementById("noteMessage").value;
    
    // Create the data to be sent to the backend
    const data = { name, message };
  
    // Send the data to the backend server using fetch
    fetch("http://localhost:3000/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      // Display the response in the messages container
      const messageContainer = document.createElement("div");
      messageContainer.classList.add("message");
      messageContainer.innerHTML = `<strong>${data.name}</strong>: ${data.message}`;
      
      // Append the new message to the messages container
      document.querySelector("#messages .messages_messagesContainer__GtH6I").appendChild(messageContainer);
      
      // Optionally clear the form
      document.getElementById("noteForm").reset();
    })
    .catch(error => {
      console.error("Error:", error);
    });
  });
  