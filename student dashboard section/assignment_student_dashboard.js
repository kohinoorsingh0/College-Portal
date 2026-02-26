document.addEventListener("DOMContentLoaded", function () {

  // ==========================================
  // DATA
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
    title: "Database Design Project",
    description: "Design ER diagram and relational schema",
    subject: "Computer Science",
    teacher: "Prof. David Kumar",
    dueDate: "2026-03-10",
    status: "Pending"
  },
  {
    id: 4,
    title: "Operating Systems Assignment",
    description: "Explain process scheduling algorithms",
    subject: "Computer Science",
    teacher: "Prof. Neha Sharma",
    dueDate: "2026-02-15",
    status: "Pending"
  },
  {
    id: 5,
    title: "Linear Algebra Worksheet",
    description: "Solve matrix determinant problems",
    subject: "Mathematics",
    teacher: "Prof. Sarah Williams",
    dueDate: "2026-03-05",
    status: "Pending"
  },
  {
    id: 6,
    title: "Thermodynamics Report",
    description: "Write report on heat transfer experiment",
    subject: "Physics",
    teacher: "Prof. Michael Chen",
    dueDate: "2026-02-18",
    status: "Submitted"
  },
  {
    id: 7,
    title: "Data Structures Mini Project",
    description: "Implement stack and queue using linked list",
    subject: "Computer Science",
    teacher: "Prof. David Kumar",
    dueDate: "2026-02-10",
    status: "Pending"
  },
  {
    id: 8,
    title: "Statistics Assignment",
    description: "Solve probability distribution questions",
    subject: "Mathematics",
    teacher: "Prof. Anjali Mehta",
    dueDate: "2026-03-02",
    status: "Pending"
  },
  {
    id: 9,
    title: "Networking Basics Quiz",
    description: "Prepare answers for TCP/IP model questions",
    subject: "Computer Science",
    teacher: "Prof. Rahul Verma",
    dueDate: "2026-02-22",
    status: "Submitted"
  },
  {
    id: 10,
    title: "Electromagnetism Assignment",
    description: "Derive Maxwell’s equations",
    subject: "Physics",
    teacher: "Prof. Michael Chen",
    dueDate: "2026-02-12",
    status: "Pending"
  },
  {
    id: 11,
    title: "Discrete Mathematics Problems",
    description: "Solve graph theory questions",
    subject: "Mathematics",
    teacher: "Prof. Sarah Williams",
    dueDate: "2026-02-19",
    status: "Pending"
  },
  {
    id: 12,
    title: "Compiler Design Task",
    description: "Explain lexical analysis phase",
    subject: "Computer Science",
    teacher: "Prof. Neha Sharma",
    dueDate: "2026-03-15",
    status: "Pending"
  },
  {
    id: 13,
    title: "Modern Physics Essay",
    description: "Discuss theory of relativity",
    subject: "Physics",
    teacher: "Prof. Michael Chen",
    dueDate: "2026-02-08",
    status: "Pending"
  },
  {
    id: 14,
    title: "Numerical Methods Assignment",
    description: "Solve interpolation problems",
    subject: "Mathematics",
    teacher: "Prof. Anjali Mehta",
    dueDate: "2026-02-27",
    status: "Submitted"
  },
  {
    id: 15,
    title: "Software Engineering Report",
    description: "Explain SDLC models",
    subject: "Computer Science",
    teacher: "Prof. Rahul Verma",
    dueDate: "2026-03-20",
    status: "Pending"
  },
  {
    id: 16,
    title: "Optics Practical File",
    description: "Submit complete optics experiment file",
    subject: "Physics",
    teacher: "Prof. Michael Chen",
    dueDate: "2026-02-05",
    status: "Pending"
  },
  {
    id: 17,
    title: "Matrix Algebra Test",
    description: "Prepare for internal assessment",
    subject: "Mathematics",
    teacher: "Prof. Sarah Williams",
    dueDate: "2026-02-24",
    status: "Submitted"
  },
  {
    id: 18,
    title: "Artificial Intelligence Case Study",
    description: "Study real-world AI implementation",
    subject: "Computer Science",
    teacher: "Prof. David Kumar",
    dueDate: "2026-03-18",
    status: "Pending"
  },
  {
    id: 19,
    title: "Quantum Mechanics Worksheet",
    description: "Solve wave function problems",
    subject: "Physics",
    teacher: "Prof. Michael Chen",
    dueDate: "2026-02-03",
    status: "Pending"
  },
  {
    id: 20,
    title: "Probability & Statistics Quiz",
    description: "Short test on distributions",
    subject: "Mathematics",
    teacher: "Prof. Anjali Mehta",
    dueDate: "2026-02-14",
    status: "Submitted"
  }
];

  // ==========================================
  // DOM REFERENCES
  // ==========================================

  const statsContainer = document.getElementById("assignStats");
  const tableBody = document.getElementById("assignTableBody");

  const searchInput = document.getElementById("assignmentSearch");
  const subjectFilter = document.getElementById("assignmentSubjectFilter");
  const statusFilter = document.getElementById("assignmentStatusFilter");

  if (!statsContainer || !tableBody) return;

  // ==========================================
  // UTIL
  // ==========================================

  function calculateDaysLeft(dueDate) {
    const today = new Date();
    const due = new Date(dueDate);
    return Math.ceil((due - today) / (1000 * 60 * 60 * 24));
  }

  function getRealStatus(a) {
    const daysLeft = calculateDaysLeft(a.dueDate);
    if (a.status === "Submitted") return "Submitted";
    if (daysLeft < 0) return "Overdue";
    return "Pending";
  }

  // ==========================================
  // BIG SVG (FOR STATS CARDS)
  // ==========================================

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

  // ==========================================
  // SMALL SVG (FOR BADGE)
  // ==========================================

  function clockSmallSVG() {
    return `
      <svg width="12" height="12" viewBox="0 0 24 24"
           fill="none" stroke="#b45309" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    `;
  }

  function alertSmallSVG() {
    return `
      <svg width="12" height="12" viewBox="0 0 24 24"
           fill="none" stroke="#b91c1c" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <circle cx="12" cy="16" r="1"/>
      </svg>
    `;
  }

  function checkSmallSVG() {
    return `
      <svg width="12" height="12" viewBox="0 0 24 24"
           fill="none" stroke="#047857" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="9 12 12 15 16 10"/>
      </svg>
    `;
  }

  function statusIcon(status) {
    if (status === "Pending") return clockSmallSVG();
    if (status === "Submitted") return checkSmallSVG();
    if (status === "Overdue") return alertSmallSVG();
    return "";
  }

  // ==========================================
  // RENDER STATS
  // ==========================================

  function renderStats(data) {

    const pending = data.filter(a => getRealStatus(a) === "Pending").length;
    const overdue = data.filter(a => getRealStatus(a) === "Overdue").length;
    const submitted = data.filter(a => getRealStatus(a) === "Submitted").length;

    statsContainer.innerHTML = `
      <div class="assign-card assign-pending">
        <div class="assign-icon">${clockSVG()}</div>
        <div>
          <h2>${pending}</h2>
          <span>Pending</span>
        </div>
      </div>

      <div class="assign-card assign-overdue">
        <div class="assign-icon">${alertSVG()}</div>
        <div>
          <h2>${overdue}</h2>
          <span>Overdue</span>
        </div>
      </div>

      <div class="assign-card assign-submitted">
        <div class="assign-icon">${checkSVG()}</div>
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

    data.forEach(a => {

      const daysLeft = calculateDaysLeft(a.dueDate);
      const realStatus = getRealStatus(a);

      const row = document.createElement("tr");

      row.innerHTML = `
        <td>
          <strong>${a.title}</strong>
          <p>${a.description}</p>
        </td>
        <td>${a.subject}</td>
        <td>${a.teacher}</td>
        <td>${a.dueDate}</td>
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
              ? `<button class="assign-btn-secondary">View</button>`
              : `<button class="assign-btn-primary" data-id="${a.id}">Submit</button>`
          }
        </td>
      `;

      tableBody.appendChild(row);
    });
  }

  // ==========================================
  // FILTER
  // ==========================================

  function applyFilters() {

    const searchValue = searchInput ? searchInput.value.toLowerCase() : "";
    const selectedSubject = subjectFilter ? subjectFilter.value : "all";
    const selectedStatus = statusFilter ? statusFilter.value : "all";

    const filtered = assignments.filter(a => {

      const realStatus = getRealStatus(a);

      return (
        (a.title.toLowerCase().includes(searchValue) ||
         a.description.toLowerCase().includes(searchValue)) &&
        (selectedSubject === "all" || a.subject === selectedSubject) &&
        (selectedStatus === "all" || realStatus === selectedStatus)
      );
    });

    renderStats(filtered);
    renderTable(filtered);
  }

  tableBody.addEventListener("click", function (e) {
    if (e.target.classList.contains("assign-btn-primary")) {
      const id = parseInt(e.target.getAttribute("data-id"));
      const assignment = assignments.find(a => a.id === id);
      if (assignment) {
        assignment.status = "Submitted";
        applyFilters();
      }
    }
  });

  if (searchInput) searchInput.addEventListener("input", applyFilters);
  if (subjectFilter) subjectFilter.addEventListener("change", applyFilters);
  if (statusFilter) statusFilter.addEventListener("change", applyFilters);

  renderStats(assignments);
  renderTable(assignments);

});