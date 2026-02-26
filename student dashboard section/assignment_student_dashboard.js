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
  },
  {
    id: 4,
    title: "Database Design Project",
    description: "Design ER diagram and relational schema",
    subject: "Computer Science",
    teacher: "Prof. David Kumar",
    dueDate: "2026-03-10",
    status: "Pending"
  },
  {
    id: 5,
    title: "Operating Systems Assignment",
    description: "Explain process scheduling algorithms",
    subject: "Computer Science",
    teacher: "Prof. Neha Sharma",
    dueDate: "2026-02-15",
    status: "Pending"
  },
  {
    id: 6,
    title: "Linear Algebra Worksheet",
    description: "Solve matrix determinant problems",
    subject: "Mathematics",
    teacher: "Prof. Sarah Williams",
    dueDate: "2026-03-05",
    status: "Pending"
  },
  {
    id: 7,
    title: "Thermodynamics Report",
    description: "Write report on heat transfer experiment",
    subject: "Physics",
    teacher: "Prof. Michael Chen",
    dueDate: "2026-02-18",
    status: "Submitted"
  },
  {
    id: 8,
    title: "Data Structures Mini Project",
    description: "Implement stack and queue using linked list",
    subject: "Computer Science",
    teacher: "Prof. David Kumar",
    dueDate: "2026-02-10",
    status: "Pending"
  },
  {
    id: 9,
    title: "Statistics Assignment",
    description: "Solve probability distribution questions",
    subject: "Mathematics",
    teacher: "Prof. Anjali Mehta",
    dueDate: "2026-03-02",
    status: "Pending"
  },
  {
    id: 10,
    title: "Networking Basics Quiz",
    description: "Prepare answers for TCP/IP model questions",
    subject: "Computer Science",
    teacher: "Prof. Rahul Verma",
    dueDate: "2026-02-22",
    status: "Submitted"
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
    <!-- Pending -->
    <div class="assign-card assign-pending">
      <div class="assign-icon">
        ${clockSVG()}
      </div>
      <div>
        <h2>${pending}</h2>
        <span>Pending</span>
      </div>
    </div>

    <!-- Overdue -->
    <div class="assign-card assign-overdue">
      <div class="assign-icon">
        ${alertSVG()}
      </div>
      <div>
        <h2>${overdue}</h2>
        <span>Overdue</span>
      </div>
    </div>

    <!-- Submitted -->
    <div class="assign-card assign-submitted">
      <div class="assign-icon">
        ${checkSVG()}
      </div>
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
    ${statusIcon(realStatus)}
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





function clockSVG() {
  return `
    <svg width="26" height="26" viewBox="0 0 24 24"
         fill="none" stroke="#b45309" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  `;
}

function alertSVG() {
  return `
    <svg width="26" height="26" viewBox="0 0 24 24"
         fill="none" stroke="#b91c1c" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <circle cx="12" cy="16" r="1"/>
    </svg>
  `;
}

function checkSVG() {
  return `
    <svg width="26" height="26" viewBox="0 0 24 24"
         fill="none" stroke="#047857" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="9 12 12 15 16 10"/>
    </svg>
  `;
}



function statusIcon(status) {

  if (status === "Pending") {
    return `
      <svg width="14" height="14" viewBox="0 0 24 24"
           fill="none" stroke="#b45309" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    `;
  }

  if (status === "Submitted") {
    return `
      <svg width="14" height="14" viewBox="0 0 24 24"
           fill="none" stroke="#047857" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="9 12 12 15 16 10"/>
      </svg>
    `;
  }

  if (status === "Overdue") {
    return `
      <svg width="14" height="14" viewBox="0 0 24 24"
           fill="none" stroke="#b91c1c" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <circle cx="12" cy="16" r="1"/>
      </svg>
    `;
  }

  return "";
}