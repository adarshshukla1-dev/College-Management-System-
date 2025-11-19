// Sample data for demonstration
let notices = [
    "Semester exams will start from Dec 10, 2025.",
    "New sports complex inaugurates on Nov 21, 2025."
];

function renderNotices() {
    const noticeList = document.getElementById("notice-list");
    noticeList.innerHTML = "";
    notices.forEach(notice => {
        let li = document.createElement("li");
        li.textContent = notice;
        noticeList.appendChild(li);
    });
}

// Add a sample notice dynamically
function addNotice() {
    notices.push("Sample notice added at " + new Date().toLocaleTimeString());
    renderNotices();
}

// Initialize notices on page load
window.onload = () => {
    renderNotices();
    document.getElementById("admissionForm").onsubmit = e => {
        e.preventDefault();
        alert("Your application has been submitted!");
    };
    document.getElementById("contactForm").onsubmit = e => {
        e.preventDefault();
        alert("Thank you for your feedback!");
    };
};
