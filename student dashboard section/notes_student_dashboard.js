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
                <div class="note-icon">📘</div>
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