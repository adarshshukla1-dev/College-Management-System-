document.addEventListener('DOMContentLoaded', () => {

    const loginContainer = document.getElementById('login-container');
    const dashboardContainer = document.getElementById('dashboard-container');

   
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');

    // Get references to dashboard navigation and logout
    const logoutButton = document.getElementById('logout-button');
    const navHome = document.getElementById('nav-home');
    const navStudents = document.getElementById('nav-students');
    const navAttendance = document.getElementById('nav-attendance');
    const navResults = document.getElementById('nav-results');
    const navFees = document.getElementById('nav-fees');

    // Get references to dashboard content sections
    const homeSection = document.getElementById('home-section');
    const studentsSection = document.getElementById('students-section');
    const attendanceSection = document.getElementById('attendance-section');
    const resultsSection = document.getElementById('results-section');
    const feesSection = document.getElementById('fees-section');

    // Get references to content display areas within sections
    const studentListDiv = document.getElementById('student-list');
    const attendanceDataDiv = document.getElementById('attendance-data');
    const resultsDataDiv = document.getElementById('results-data');
    const feesDataDiv = document.getElementById('fees-data');

    // --- Hardcoded Credentials for Client-Side Simulation ---
    const VALID_USERNAME = 'user';
    const VALID_PASSWORD = 'password';

    // --- Dummy Data (Frontend Only - Not Persistent) ---
    const students = [
        { id: 'S001', name: 'Alice Smith', course: 'Computer Science', email: 'alice@college.com' },
        { id: 'S002', name: 'Bob Johnson', course: 'Electrical Engineering', email: 'bob@college.com' },
        { id: 'S003', name: 'Charlie Brown', course: 'Mechanical Engineering', email: 'charlie@college.com' },
        { id: 'S004', name: 'Diana Prince', course: 'Physics', email: 'diana@college.com' },
        { id: 'S005', name: 'Eve Adams', course: 'Mathematics', email: 'eve@college.com' }
    ];

    const attendanceRecords = [
        { studentId: 'S001', date: '2023-10-26', subject: 'Calculus I', status: 'Present' },
        { studentId: 'S001', date: '2023-10-25', subject: 'Data Structures', status: 'Present' },
        { studentId: 'S002', date: '2023-10-26', subject: 'Circuit Analysis', status: 'Absent' },
        { studentId: 'S003', date: '2023-10-26', subject: 'Thermodynamics', status: 'Present' },
        { studentId: 'S004', date: '2023-10-26', subject: 'Quantum Mechanics', status: 'Present' },
        { studentId: 'S005', date: '2023-10-26', subject: 'Linear Algebra', status: 'Present' }
    ];

    const results = [
        { studentId: 'S001', subject: 'Calculus I', grade: 'A', semester: 'Fall 2023' },
        { studentId: 'S001', subject: 'Data Structures', grade: 'B+', semester: 'Fall 2023' },
        { studentId: 'S002', subject: 'Circuit Analysis', grade: 'C', semester: 'Fall 2023' },
        { studentId: 'S003', subject: 'Thermodynamics', grade: 'A-', semester: 'Fall 2023' },
        { studentId: 'S004', subject: 'Quantum Mechanics', grade: 'B', semester: 'Fall 2023' },
        { studentId: 'S005', subject: 'Linear Algebra', grade: 'A', semester: 'Fall 2023' }
    ];

    const feeDeposits = [
        { studentId: 'S001', amount: 1500, date: '2023-09-01', status: 'Paid', dueDate: '2023-09-30' },
        { studentId: 'S002', amount: 1500, date: '2023-09-05', status: 'Due', dueDate: '2023-09-30' },
        { studentId: 'S003', amount: 1500, date: '2023-09-10', status: 'Paid', dueDate: '2023-09-30' },
        { studentId: 'S004', amount: 1500, date: '2023-09-15', status: 'Paid', dueDate: '2023-09-30' },
        { studentId: 'S005', amount: 1500, date: '2023-09-20', status: 'Paid', dueDate: '2023-09-30' }
    ];

    // --- Utility Functions for Section Management ---

    // Hides all content sections in the dashboard
    function hideAllSections() {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => section.style.display = 'none');
    }

    // Shows a specific content section
    function showSection(sectionElement) {
        hideAllSections();
        sectionElement.style.display = 'block';
    }

    // --- Data Rendering Functions ---

    function renderStudentList() {
        let html = '<table><thead><tr><th>ID</th><th>Name</th><th>Course</th><th>Email</th></tr></thead><tbody>';
        students.forEach(student => {
            html += `<tr><td>${student.id}</td><td>${student.name}</td><td>${student.course}</td><td>${student.email}</td></tr>`;
        });
        html += '</tbody></table>';
        studentListDiv.innerHTML = html;
    }

    function renderAttendanceData() {
        let html = '<table><thead><tr><th>Student ID</th><th>Date</th><th>Subject</th><th>Status</th></tr></thead><tbody>';
        attendanceRecords.forEach(record => {
            html += `<tr><td>${record.studentId}</td><td>${record.date}</td><td>${record.subject}</td><td>${record.status}</td></tr>`;
        });
        html += '</tbody></table>';
        attendanceDataDiv.innerHTML = html;
    }

    function renderResultsData() {
        let html = '<table><thead><tr><th>Student ID</th><th>Subject</th><th>Grade</th><th>Semester</th></tr></thead><tbody>';
        results.forEach(result => {
            html += `<tr><td>${result.studentId}</td><td>${result.subject}</td><td>${result.grade}</td><td>${result.semester}</td></tr>`;
        });
        html += '</tbody></table>';
        resultsDataDiv.innerHTML = html;
    }

    function renderFeesData() {
        let html = '<table><thead><tr><th>Student ID</th><th>Amount</th><th>Due Date</th><th>Status</th></tr></thead><tbody>';
        feeDeposits.forEach(fee => {
            html += `<tr><td>${fee.studentId}</td><td>$${fee.amount}</td><td>${fee.dueDate}</td><td>${fee.status}</td></tr>`;
        });
        html += '</tbody></table>';
        feesDataDiv.innerHTML = html;
    }

    // --- Login/Logout Logic ---

    // Displays the login form and hides the dashboard
    function showLogin() {
        loginContainer.style.display = 'block';
        dashboardContainer.style.display = 'none';
        loginError.textContent = ''; // Clear any previous error message
        loginForm.reset(); // Clear form fields
    }

    // Displays the dashboard and hides the login form
    function showDashboard() {
        loginContainer.style.display = 'none';
        dashboardContainer.style.display = 'block';
        showSection(homeSection); // Show the home section by default after login
    }

    // Checks if the user is "logged in" based on localStorage
    function checkLoginStatus() {
        const loggedIn = localStorage.getItem('loggedIn');
        if (loggedIn === 'true') {
            showDashboard();
        } else {
            showLogin();
        }
    }

    // Handle login form submission
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission (page reload)

        const usernameInput = document.getElementById('username').value;
        const passwordInput = document.getElementById('password').value;

        // Simulate authentication with hardcoded credentials
        if (usernameInput === VALID_USERNAME && passwordInput === VALID_PASSWORD) {
            localStorage.setItem('loggedIn', 'true'); // Set a flag in local storage
            showDashboard();
        } else {
            loginError.textContent = 'Invalid username or password.';
        }
    });

    // Handle logout button click
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('loggedIn'); // Remove the loggedIn flag
        showLogin(); // Go back to the login page
    });

    // --- Navigation Event Listeners ---

    navHome.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior
        showSection(homeSection);
    });

    navStudents.addEventListener('click', (e) => {
        e.preventDefault();
        renderStudentList(); // Render data before showing the section
        showSection(studentsSection);
    });

    navAttendance.addEventListener('click', (e) => {
        e.preventDefault();
        renderAttendanceData(); // Render data before showing the section
        showSection(attendanceSection);
    });

    navResults.addEventListener('click', (e) => {
        e.preventDefault();
        renderResultsData(); // Render data before showing the section
        showSection(resultsSection);
    });

    navFees.addEventListener('click', (e) => {
        e.preventDefault();
        renderFeesData(); // Render data before showing the section
        showSection(feesSection);
    });

    // --- Initial Setup ---
    checkLoginStatus(); // Check login status when the page first loads
});
