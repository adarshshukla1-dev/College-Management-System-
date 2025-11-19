const notices = [
  "Semester exams will start from Dec 10, 2025.",
  "New sports complex inaugurates on Nov 21, 2025."
];

function renderNotices() {
  const noticeList = document.getElementById("notice-list");
  noticeList.innerHTML = "";
  if (notices.length === 0) {
    noticeList.innerHTML = "<li>No notices available.</li>";
    return;
  }
  notices.forEach((notice, index) => {
    const li = document.createElement("li");
    li.textContent = notice;
    noticeList.appendChild(li);
  });
}

function addNotice() {
  const newNotice = `Sample notice added at ${new Date().toLocaleTimeString()}`;
  notices.push(newNotice);
  renderNotices();
}

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

window.onload = () => {
  renderNotices();
  document.getElementById("addNoticeBtn").onclick = addNotice;
  setupFormValidation();
  setupNavigation();
};
