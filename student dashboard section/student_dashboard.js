// Select all navigation buttons (left sidebar buttons)
const navItems = document.querySelectorAll(".nav-item");

// Select all page sections (right side content sections)
const pages = document.querySelectorAll(".page-section");


// Loop through each navigation button
navItems.forEach((btn) => {

  // Add click event listener to each button
  btn.addEventListener("click", () => {

    // ==============================
    // STEP 1: Remove active class from all nav buttons
    // ==============================
    navItems.forEach((b) => {
      b.classList.remove("active");
    });

    // Add active class to the clicked button
    btn.classList.add("active");


    // ==============================
    // STEP 2: Hide all pages
    // ==============================
    pages.forEach((page) => {
      page.classList.remove("active-page");
    });


    // ==============================
    // STEP 3: Show the selected page
    // ==============================

    // Get the page id stored in data-page attribute
    const pageId = btn.getAttribute("data-page");

    // Select that page by id and make it active
    document.getElementById(pageId).classList.add("active-page");

  });

});