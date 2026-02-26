// ==========================================
// ASSIGNMENTS DATA (Replace with API later)
// ==========================================

let assignments = [
  {
    id: 1,
    title: "Calculus Problem Set 3",
    description: "Solve all problems from Chapter 5",
    subject: "Mathematics",
    teacher: "Prof. Sarah Williams",
    dueDate: "2026-02-25",
    status: "Pending"
  },
  {
    id: 2,
    title: "Physics Lab Report",
    description: "Complete lab report on pendulum experiment",
    subject: "Physics",
    teacher: "Prof. Michael Chen",
    dueDate: "2026-02-28",
    status: "Submitted"
  },
  {
    id: 3,
    title: "Essay on Quantum Theory",
    description: "Write a 2000-word essay on quantum entanglement",
    subject: "Physics",
    teacher: "Prof. Michael Chen",
    dueDate: "2026-02-20",
    status: "Pending"
  }
];


// ==========================================
// DOM REFERENCES
// ==========================================

const statsContainer = document.getElementById("assignStats");
const tableBody = document.getElementById("assignTableBody");


// ==========================================
// UTIL FUNCTION — DAYS LEFT
// ==========================================

function calculateDaysLeft(dueDate) {
  const today = new Date();
  const due = new Date(dueDate);

  const diff = due - today;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return days;
}


// ==========================================
// AUTO STATUS CHECK
// ==========================================

function getRealStatus(assignment) {
  const daysLeft = calculateDaysLeft(assignment.dueDate);

  if (assignment.status === "Submitted") {
    return "Submitted";
  }

  if (daysLeft < 0) {
    return "Overdue";
  }

  return "Pending";
}


// ==========================================
// RENDER STATS CARDS
// ==========================================

function renderStats(data) {
  const pending = data.filter(a => getRealStatus(a) === "Pending").length;
  const overdue = data.filter(a => getRealStatus(a) === "Overdue").length;
  const submitted = data.filter(a => getRealStatus(a) === "Submitted").length;

  statsContainer.innerHTML = `
    <div class="assign-card assign-pending">
      <div class="assign-icon"></div>
      <div>
        <h2>${pending}</h2>
        <span>Pending</span>
      </div>
    </div>

    <div class="assign-card assign-overdue">
      <div class="assign-icon"></div>
      <div>
        <h2>${overdue}</h2>
        <span>Overdue</span>
      </div>
    </div>

    <div class="assign-card assign-submitted">
      <div class="assign-icon"></div>
      <div>
        <h2>${submitted}</h2>
        <span>Submitted</span>
      </div>
    </div>
  `;
}


// ==========================================
// RENDER TABLE
// ==========================================

function renderTable(data) {
  tableBody.innerHTML = "";

  data.forEach(assignment => {

    const daysLeft = calculateDaysLeft(assignment.dueDate);
    const realStatus = getRealStatus(assignment);

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>
        <strong>${assignment.title}</strong>
        <p>${assignment.description}</p>
      </td>

      <td>${assignment.subject}</td>

      <td>${assignment.teacher}</td>

      <td>${assignment.dueDate}</td>

      <td>${daysLeft}</td>

      <td>
        <span class="assign-badge ${realStatus.toLowerCase()}">
          ${realStatus}
        </span>
      </td>

      <td>
        ${
          realStatus === "Submitted"
            ? `<button class="assign-btn-secondary" data-id="${assignment.id}">
                 View
               </button>`
            : `<button class="assign-btn-primary" data-id="${assignment.id}">
                 Submit
               </button>`
        }
      </td>
    `;

    tableBody.appendChild(row);
  });
}


// ==========================================
// EVENT HANDLING (Submit Button Logic)
// ==========================================

tableBody.addEventListener("click", function (e) {

  if (e.target.classList.contains("assign-btn-primary")) {

    const id = parseInt(e.target.getAttribute("data-id"));

    const assignment = assignments.find(a => a.id === id);

    if (assignment) {
      assignment.status = "Submitted";
      renderStats(assignments);
      renderTable(assignments);
    }
  }

});


// ==========================================
// INITIAL LOAD
// ==========================================

renderStats(assignments);
renderTable(assignments);



// ==========================================
// FUTURE BACKEND READY VERSION
// ==========================================

/*
fetch("http://localhost:5000/api/assignments")
  .then(res => res.json())
  .then(data => {
    assignments = data;
    renderStats(assignments);
    renderTable(assignments);
  });
*/