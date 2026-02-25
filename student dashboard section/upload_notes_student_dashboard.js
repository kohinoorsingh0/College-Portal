document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       SAMPLE DATA
    ========================== */

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
    },
    {
        title: "Physics Lab Manual",
        subject: "Physics",
        date: "Feb 10, 2026",
        status: "Rejected"
    },
    {
        title: "Organic Chemistry Notes",
        subject: "Chemistry",
        date: "Feb 08, 2026",
        status: "Approved"
    },
    {
        title: "Data Structures Guide",
        subject: "Computer Science",
        date: "Feb 05, 2026",
        status: "Pending"
    },
    {
        title: "Linear Algebra Practice",
        subject: "Mathematics",
        date: "Feb 02, 2026",
        status: "Rejected"
    },
    {
        title: "Thermodynamics Notes",
        subject: "Physics",
        date: "Jan 30, 2026",
        status: "Approved"
    }
];

    /* =========================
       RENDER HISTORY
    ========================== */

    function renderHistory() {
        const historyContainer = document.getElementById("historyContainer");
        if (!historyContainer) return;

        historyContainer.innerHTML = "";

        notesData.forEach(note => {
            const div = document.createElement("div");
            div.classList.add("history-item");

           div.innerHTML = `
    <div class="history-top">
        <h4>${note.title}</h4>
        <span class="status ${note.status.toLowerCase()}">
            ${note.status}
        </span>
    </div>
    <small>${note.subject} • ${note.date}</small>
`;

            historyContainer.appendChild(div);
        });
    }

    renderHistory();


    /* =========================
       EVENT DELEGATION (IMPORTANT)
       Works for dynamic pages
    ========================== */

    document.addEventListener("click", function (e) {

        /* ===== Upload Box ===== */
        if (e.target.closest("#uploadBox")) {
            const fileInput = document.getElementById("noteFile");
            if (fileInput) fileInput.click();
        }

        /* ===== Dropdown Toggle ===== */
        if (e.target.closest(".dropdown-btn")) {
            const dropdown = e.target.closest(".custom-dropdown");
            dropdown.classList.toggle("active");
        }

        /* ===== Dropdown Option Select ===== */
        if (e.target.classList.contains("dropdown-option")) {

            const dropdown = e.target.closest(".custom-dropdown");
            const options = dropdown.querySelectorAll(".dropdown-option");
            const selectedText = dropdown.querySelector(".selected-text");
            const hiddenInput = document.getElementById("noteSubject");

            options.forEach(o => o.classList.remove("selected"));
            e.target.classList.add("selected");

            selectedText.textContent = e.target.textContent;
            if (hiddenInput) hiddenInput.value = e.target.textContent;

            dropdown.classList.remove("active");
        }

        /* ===== Close Dropdown Outside Click ===== */
        if (!e.target.closest(".custom-dropdown")) {
            document.querySelectorAll(".custom-dropdown")
                .forEach(d => d.classList.remove("active"));
        }

    });


    /* =========================
       FORM SUBMIT
    ========================== */

    document.addEventListener("submit", function (e) {

        if (e.target.id === "uploadForm") {
            e.preventDefault();

            const title = document.getElementById("noteTitle")?.value;
            const subject = document.getElementById("noteSubject")?.value;

            if (!title || !subject) {
                alert("Please fill all fields.");
                return;
            }

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

            e.target.reset();

            const selectedText = document.querySelector(".selected-text");
            if (selectedText) selectedText.textContent = "Select subject";
        }

    });

});