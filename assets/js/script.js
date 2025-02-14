const form = document.getElementById('noteForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  const name = document.getElementById('noteAuthor').value;
  const message = document.getElementById('noteMessage').value;

  const noteData = {
    name: name,
    message: message,
  };

  try {
    // Send data to the backend server
    const response = await fetch('http://localhost:5000/submitNote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteData),
    });

    const result = await response.json();
    if (response.status === 200) {
      alert(result.message); // Show success message
      getNotes(); // Fetch and display all notes after submission
    } else {
      alert(result.error); // Show error message
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

// Function to fetch and display notes
async function getNotes() {
  try {
    const response = await fetch('http://localhost:5000/getNotes');
    const notes = await response.json();

    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = ''; // Clear existing messages

    notes.forEach((note) => {
      const noteElement = document.createElement('div');
      noteElement.classList.add('note');
      noteElement.innerHTML = `<strong>${note.name}</strong>: ${note.message}`;
      messagesContainer.appendChild(noteElement);
    });
  } catch (error) {
    console.error('Error fetching notes:', error);
  }
}

// Fetch existing notes when the page loads
getNotes();
