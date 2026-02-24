const uploadBox = document.getElementById("uploadBox");
const fileInput = document.getElementById("noteFile");
const form = document.getElementById("uploadForm");
const historyContainer = document.getElementById("historyContainer");

let notesData = [
    {
        title: "Algorithms Notes",
        subject: "Computer Science",
        date: "Feb 15, 2026",
        status: "Approved"
    },
    {
        title: "Calculus Summary",
        subject: "Mathematics",
        date: "Feb 14, 2026",
        status: "Pending"
    }
];

// Render Function
function renderHistory() {
    historyContainer.innerHTML = "";

    notesData.forEach(note => {
        const div = document.createElement("div");
        div.classList.add("history-item");

        div.innerHTML = `
            <h4>${note.title}</h4>
            <small>${note.subject} • ${note.date}</small>
            <span class="status ${note.status.toLowerCase()}">
                ${note.status}
            </span>
        `;

        historyContainer.appendChild(div);
    });
}

renderHistory();


// Upload Box Click
uploadBox.addEventListener("click", () => {
    fileInput.click();
});


// Form Submit
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("noteTitle").value;
    const subject = document.getElementById("noteSubject").value;

    const today = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric"
    });

    const newNote = {
        title,
        subject,
        date: today,
        status: "Pending"
    };

    notesData.unshift(newNote);
    renderHistory();
    form.reset();
});