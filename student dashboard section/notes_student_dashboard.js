const notes = [
    {
        id: 1,
        title: "Linear Algebra - Chapter 3",
        subject: "Mathematics",
        professor: "Prof. Sarah Williams",
        date: "Feb 15, 2026",
        size: "2.4 MB"
    },
    {
        id: 2,
        title: "Quantum Mechanics Notes",
        subject: "Physics",
        professor: "Prof. Michael Chen",
        date: "Feb 14, 2026",
        size: "3.1 MB"
    },
    {
        id: 3,
        title: "Data Structures Guide",
        subject: "Computer Science",
        professor: "Prof. David Kumar",
        date: "Feb 13, 2026",
        size: "4.8 MB"
    },
    {
        id: 4,
        title: "Calculus Problem Set Solutions",
        subject: "Mathematics",
        professor: "Prof. Sarah Williams",
        date: "Feb 12, 2026",
        size: "1.9 MB"
    },
    {
        id: 5,
        title: "Thermodynamics Lecture Notes",
        subject: "Physics",
        professor: "Prof. Michael Chen",
        date: "Feb 11, 2026",
        size: "2.7 MB"
    },
    {
        id: 6,
        title: "Thermodynamics Lecture Notes part 2",
        subject: "Physics",
        professor: "Prof. Michael disang",
        date: "Feb 13, 2026",
        size: "2.9 MB"
    },
    {
        id: 7,
        title: "Database Design Principles",
        subject: "Computer Science",
        professor: "Prof. David Kumar",
        date: "Feb 10, 2026",
        size: "3.5 MB"
    }
];

const container = document.getElementById("notesContainer");
const searchInput = document.getElementById("searchInput");

/* ===========================
   RENDER NOTES
=========================== */

function renderNotes(filteredNotes) {
    container.innerHTML = "";

    if (filteredNotes.length === 0) {
        container.innerHTML = "<p>No notes found.</p>";
        return;
    }

    filteredNotes.forEach(note => {
        const card = document.createElement("div");
        card.classList.add("note-card");

        card.innerHTML = `
            <div class="note-card-top">
                <div class="note-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M15.5 7H8.5M12.499 11H8.49902"/>
    <path d="M20 22H6C4.89543 22 4 21.1046 4 20M4 20C4 18.8954 4.89543 18 6 18H20V6C20 4.11438 20 3.17157 19.4142 2.58579C18.8284 2 17.8856 2 16 2H10C7.17157 2 5.75736 2 4.87868 2.87868C4 3.75736 4 5.17157 4 8V20Z"/>
    <path d="M19.5 18C19.5 18 18.5 18.7628 18.5 20C18.5 21.2372 19.5 22 19.5 22"/>
</svg></div>
                <div class="note-content">
                    <h3>${note.title}</h3>
                    <p class="subject">${note.subject}</p>
                    <p class="meta">By: ${note.professor}</p>
                    <p class="meta">${note.date} • ${note.size}</p>
                </div>
            </div>

            <div class="note-actions">
                <button class="download-btn" onclick="downloadNote(${note.id})">
                    ↓ Download
                </button>
                <button class="view-btn">👁</button>
            </div>
        `;

        container.appendChild(card);
    });
}

/* ===========================
   DOWNLOAD
=========================== */

function downloadNote(id) {
    alert("Downloading note ID: " + id);
}

/* ===========================
   FILTER LOGIC
=========================== */

let subjectValue = "All";

function filterNotes() {
    const searchValue = searchInput.value.toLowerCase();

    const filtered = notes.filter(note => {
        const matchesSearch = note.title.toLowerCase().includes(searchValue);
        const matchesSubject =
            subjectValue === "All" || note.subject === subjectValue;

        return matchesSearch && matchesSubject;
    });

    renderNotes(filtered);
}

searchInput.addEventListener("input", filterNotes);

/* ===========================
   STYLISH DROPDOWN
=========================== */

const dropdown = document.getElementById("subjectDropdown");
const trigger = dropdown.querySelector(".select-trigger");
const items = dropdown.querySelectorAll(".dropdown-item");
const selectedText = document.getElementById("selectedText");

trigger.addEventListener("click", () => {
    dropdown.classList.toggle("open");
});

items.forEach(item => {
    item.addEventListener("click", () => {
        items.forEach(i => {
            i.classList.remove("active");
            const check = i.querySelector(".check");
            if (check) check.remove();
        });

        item.classList.add("active");

        const checkMark = document.createElement("span");
        checkMark.classList.add("check");
        checkMark.textContent = "✓";
        item.appendChild(checkMark);

        selectedText.textContent = item.textContent.replace("✓", "").trim();
        subjectValue = item.getAttribute("data-value");

        dropdown.classList.remove("open");

        filterNotes();
    });
});

document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
    }
});

/* ===========================
   INITIAL LOAD
=========================== */

renderNotes(notes);