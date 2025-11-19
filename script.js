// Existing notices and form setup code unchanged
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

// Render notices
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

// Add new sample notice
function addNotice() {
  const newNotice = `Sample notice added at ${new Date().toLocaleTimeString()}`;
  notices.push(newNotice);
  renderNotices();
}

// Render attendance table rows
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

// Save attendance data
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

  // Clear message after 3 seconds
  setTimeout(() => {
    document.getElementById("statusMessage").textContent = "";
  }, 3000);
}

// Smooth scroll and form validation (unchanged from previous)
function smoothScroll(event) {
  event.preventDefault();
  const targetId = event.currentTarget.getAttribute("href").substring(1);
  const targetSection = document.getElementById(targetId);
  window.scroll({
    top: targetSection.offsetTop - 60,
    behavior: "smooth",
  });
}

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

// Initialize everything on page load
window.onload = () => {
  renderNotices();
  document.getElementById("addNoticeBtn").onclick = addNotice;
  setupFormValidation();
  setupNavigation();
  renderAttendanceTable();
  document.getElementById("saveAttendanceBtn").onclick = saveAttendance;
};
