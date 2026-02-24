const roleSelect = document.getElementById("roleSelect");
const selectBtn = document.getElementById("selectBtn");
const selectMenu = document.getElementById("selectMenu");
const selectedText = document.getElementById("selectedText");
const roleInput = document.getElementById("roleInput");

selectBtn.addEventListener("click", () => {
  roleSelect.classList.toggle("active");
});

document.querySelectorAll(".option").forEach(option => {
  option.addEventListener("click", () => {
    const value = option.getAttribute("data-value");

    selectedText.innerText = value;
    roleInput.value = value;

    roleSelect.classList.remove("active");
    roleSelect.classList.add("filled");
  });
});

/* Close dropdown if clicked outside */
document.addEventListener("click", (e) => {
  if (!roleSelect.contains(e.target)) {
    roleSelect.classList.remove("active");
  }
});

