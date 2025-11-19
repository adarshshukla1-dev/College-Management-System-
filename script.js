// Hardcoded user for demo purpose
const validUser = {
  username: "admin",
  password: "password123"
};

const loginSection = document.getElementById("loginSection");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");
const logoutBtn = document.getElementById("logoutBtn");
const mainContent = document.querySelector("main");
const header = document.querySelector("header");

// Show or hide content depending on login state
function updateUIForLoginState() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") {
    loginSection.style.display = "none";
    mainContent.style.display = "block";
    header.style.display = "block";
    logoutBtn.style.display = "inline-block";
  } else {
    loginSection.style.display = "block";
    mainContent.style.display = "none";
    header.style.display = "none";
    logoutBtn.style.display = "none";
  }
}

// Handle login form submit
loginForm.onsubmit = function (e) {
  e.preventDefault();
  loginError.textContent = "";
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === validUser.username && password === validUser.password) {
    localStorage.setItem("isLoggedIn", "true");
    updateUIForLoginState();
  } else {
    loginError.textContent = "Invalid username or password.";
  }
};

// Handle logout button click
logoutBtn.onclick = function () {
  localStorage.removeItem("isLoggedIn");
  updateUIForLoginState();
};

// Initialize UI on page load
window.onload = () => {
  updateUIForLoginState();

  // Existing initialization calls
  renderNotices();
  document.getElementById("addNoticeBtn").onclick = addNotice;
  setupFormValidation();
  setupNavigation();
  renderAttendanceTable();
  document.getElementById("saveAttendanceBtn").onclick = saveAttendance;
};
const notices = [
  "Semester exams will start from Dec 10, 2025.",
  "New sports complex inaugurates on Nov 21, 2025."
];

// Sample student list for attendance
const students = [
  "Alice Smith",
  "Bob Johnson",
  "Charlie Lee",
  "Diana Patel",
  "Ethan Wang"
];

// Render notices dynamically
function renderNotices() {
  const noticeList = document.getElementById("notice-list");
  noticeList.innerHTML = "";
  if (notices.length === 0) {
    noticeList.innerHTML = "<li>No notices available.</li>";
    return;
  }
  notices.forEach((notice) => {
    const li = document.createElement("li");
    li.textContent = notice;
    noticeList.appendChild(li);
  });
}

// Add a sample notice dynamically
function addNotice() {
  const newNotice = `Sample notice added at ${new Date().toLocaleTimeString()}`;
  notices.push(newNotice);
  renderNotices();
}

// Render the attendance table
function renderAttendanceTable() {
  const tbody = document.querySelector("#attendanceTable tbody");
  tbody.innerHTML = ""; // Clear existing rows

  students.forEach((student, index) => {
    const tr = document.createElement("tr");

    const nameTd = document.createElement("td");
    nameTd.textContent = student;
    tr.appendChild(nameTd);

    const presentTd = document.createElement("td");
    const presentInput = document.createElement("input");
    presentInput.type = "radio";
    presentInput.name = `attendance-${index}`;
    presentInput.value = "present";
    presentTd.appendChild(presentInput);
    tr.appendChild(presentTd);

    const absentTd = document.createElement("td");
    const absentInput = document.createElement("input");
    absentInput.type = "radio";
    absentInput.name = `attendance-${index}`;
    absentInput.value = "absent";
    absentTd.appendChild(absentInput);
    tr.appendChild(absentTd);

    tbody.appendChild(tr);
  });
}

// Save attendance and show confirmation
function saveAttendance() {
  const attendanceData = students.map((student, index) => {
    const selected = document.querySelector(`input[name="attendance-${index}"]:checked`);
    return {
      student,
      status: selected ? selected.value : "absent" // default absent if none selected
    };
  });

  console.log("Saved Attendance:", attendanceData);
  document.getElementById("statusMessage").textContent = "Attendance saved successfully!";

  setTimeout(() => {
    document.getElementById("statusMessage").textContent = "";
  }, 3000);
}

// Smooth scrolling for in-page nav
function smoothScroll(event) {
  event.preventDefault();
  const targetId = event.currentTarget.getAttribute("href").substring(1);
  const targetSection = document.getElementById(targetId);
  window.scroll({
    top: targetSection.offsetTop - 60,
    behavior: "smooth",
  });
}

// Form validation helper
function validateForm(form) {
  let valid = true;
  form.querySelectorAll("input, select, textarea").forEach((field) => {
    if (!field.checkValidity()) {
      valid = false;
      field.classList.add("invalid");
    } else {
      field.classList.remove("invalid");
    }
  });
  return valid;
}

function setupFormValidation() {
  const admissionForm = document.getElementById("admissionForm");
  const contactForm = document.getElementById("contactForm");

  admissionForm.onsubmit = (e) => {
    e.preventDefault();
    if (validateForm(admissionForm)) {
      alert("Your application has been submitted!");
      admissionForm.reset();
    } else {
      alert("Please fill out all fields properly.");
    }
  };

  contactForm.onsubmit = (e) => {
    e.preventDefault();
    if (validateForm(contactForm)) {
      alert("Thank you for your feedback!");
      contactForm.reset();
    } else {
      alert("Please fill out all fields properly.");
    }
  };
}

function setupNavigation() {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", smoothScroll);
  });
}

window.onload = () => {
  renderNotices();
  document.getElementById("addNoticeBtn").onclick = addNotice;
  setupFormValidation();
  setupNavigation();
  renderAttendanceTable();
  document.getElementById("saveAttendanceBtn").onclick = saveAttendance;
};

