
let notesContainer = document.getElementById('notesContainer');
let noteContentInput = document.getElementById('noteContent');
const notes = JSON.parse(localStorage.getItem('notes')) || [];



// Commented out the initial notes for now
// const notes = [
//     {
//         id: '1',
//         content: 'random text 1',
//         priority: 1,
//         category: 'home',
//         profile: 'profile.webp'
//     },
//     {
//         id: '2',
//         content: 'random text 2',
//         priority: 1,
//         category: 'hobbies',
//         profile: 'profile.webp'
//     },
//     {
//         id: '3',
//         content: 'random text 3',
//         priority: 1,
//         category: 'work',
//         profile: 'profile.webp'
//     }
// ];

updateUINotesContainer();

function updateUINotesContainer() {
    notesContainer.innerHTML = '';

    notes.forEach(function (noteItem) {
        let noteDiv = createNoteElement(noteItem);
        notesContainer.appendChild(noteDiv);
    });
}
function createNoteElement(noteItem) {
let noteDiv = document.createElement('div');
noteDiv.className = `flex flex-col p-4 rounded-md bg-gray-200 relative note note-${noteItem.category.toLowerCase()}`;

let profileDiv = document.createElement('div');
profileDiv.className = "h-16 w-16 overflow-hidden rounded-full mb-0"; // Adjusted margin from mb-2 to mb-1
profileDiv.style.flexShrink = '0';// Avoid excessive shrinking

let profileImg = document.createElement('img');
profileImg.src = "girl  pic.jpeg";
profileImg.alt = "";
profileDiv.appendChild(profileImg);

let contentDiv = document.createElement('div');
contentDiv.className = 'overflow-y-auto h-20'; // Adjust the height as needed
contentDiv.style.marginBottom = '0px'; // Reduced margin from 10px to 5px

let contentP = document.createElement('p');
contentP.textContent = noteItem.content;

contentDiv.appendChild(contentP);

let deleteButton = document.createElement('p');
deleteButton.className = "delete-button absolute top-4 right-4 rounded-full bg-white cursor-pointer";
deleteButton.textContent = 'X';
deleteButton.onclick = function () {
    removeNote(noteItem.id);
};
let editButton = document.createElement('p');
editButton.className = "edit-button absolute top-4 right-12 rounded-full bg-white cursor-pointer";
editButtonImg.src="penicon.png";
editButton.onclick = function () {
    editNote(noteItem.id, noteItem.content, noteItem.priority, noteItem.category);
}

noteDiv.appendChild(profileDiv);
noteDiv.appendChild(contentDiv);
noteDiv.appendChild(deleteButton);
noteDiv.appendChild(editButton);

return noteDiv;
}

function addNote() {
    const newNoteContent = noteContentInput.value.trim();
    const selectedPriority = document.querySelector('input[name="priority"]:checked');
    const selectedCategory = document.getElementById('category');
    const priorityError = document.getElementById('priorityError');
    const categoryError = document.getElementById('categoryError');

    priorityError.textContent = "";
    categoryError.textContent = "";

        if (!newNoteContent) {
            alert('Please fill out the note content field.');
            return;
        }

        if (!selectedPriority) {
            priorityError.textContent = "Priority is required.";
            return;
        }

        if (!selectedCategory.value) {
            categoryError.textContent = "Category is required.";
            return;
        }

        const newNote = {
            id: Date.now().toString(),
            content: newNoteContent,
            priority: selectedPriority.value,
            category: selectedCategory.value,
            profile: 'girl  pic.jpeg'
        };

        let newNoteDiv = createNoteElement(newNote);
        notesContainer.appendChild(newNoteDiv);

        notes.unshift(newNote);
        updateLocalStorage();

        noteContentInput.value = '';
        selectedCategory.value = ''; // Reset category dropdown
    }
    function editNote(id, content, priority, category) {
        const editedContent = prompt("Edit the note content:", content);
      
        if (editedContent !== null) {
          const editedNote = {
            id: id,
            content: editedContent,
            priority: priority,
            category: category,
            profile: 'girl  pic.jpeg'
          };
      
          // Find the index of the edited note in the array
          const index = notes.findIndex(note => note.id === id);
      
          // Update the note in the array
          if (index !== -1) {
            notes[index] = editedNote;
      
            // Update the UI
            updateUINotesContainer();
            
            // Update local storage
            updateLocalStorage();
          }
        }
      }
      

function removeNote(noteId) {
    const updatedNotes = notes.filter(function (note) {
        return note.id !== noteId;
    });

    notesContainer.innerHTML = '';

    updatedNotes.forEach(function (noteItem) {
        let noteDiv = createNoteElement(noteItem);
        notesContainer.appendChild(noteDiv);
    });

    notes.length = 0;

    updatedNotes.forEach(function (noteItem) {
        notes.push(noteItem);
    });
    updateLocalStorage();

}
function updateLocalStorage() {
localStorage.setItem('notes', JSON.stringify(notes));
}

