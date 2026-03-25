const addBtn = document.getElementById("addBtn");
const notesContainer = document.getElementById("notesContainer");

// Load notes from localStorage
function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notesContainer.innerHTML = "";
  notes.forEach(note => createNote(note));
}

// Save notes to localStorage
function saveNotes() {
  const notes = [];
  document.querySelectorAll("textarea").forEach(note => {
    notes.push(note.value);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Create note element
function createNote(text = "") {
  const noteDiv = document.createElement("div");
  noteDiv.classList.add("note");

  const textarea = document.createElement("textarea");
  textarea.value = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "X";
  deleteBtn.classList.add("deleteBtn");

  // Delete note
  deleteBtn.addEventListener("click", () => {
    noteDiv.remove();
    saveNotes();
  });

  // Save on typing
  textarea.addEventListener("input", saveNotes);

  noteDiv.appendChild(textarea);
  noteDiv.appendChild(deleteBtn);
  notesContainer.appendChild(noteDiv);
}

// Add new note
addBtn.addEventListener("click", () => createNote());

// Initial load
loadNotes();