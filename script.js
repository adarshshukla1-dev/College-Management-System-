// script.js
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const homeSection = document.getElementById('home-section');
    const aboutSection = document.getElementById('about-section');
    const academicsSection = document.getElementById('academics-section');
    const admissionsSection = document.getElementById('admissions-section');
    const loginSection = document.getElementById('login-section');
    
    const homeLink = document.getElementById('home-link');
    const aboutLink = document.getElementById('about-link');
    const academicsLink = document.getElementById('academics-link');
    const admissionsLink = document.getElementById('admissions-link');
    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');
    
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('login-error');
    
    // Default users (in a real app, this would be on the server)
    const users = [
        { username: '2023001', password: 'student123' },
        { username: '2023002', password: 'student456' },
        { username: '2023003', password: 'student789' }
    ];
    
    // Navigation functions
    homeLink.addEventListener('click', function(e) {
        e.preventDefault();
        showSection('home');
    });
    
    aboutLink.addEventListener('click', function(e) {
        e.preventDefault();
        showSection('about');
    });
    
    academicsLink.addEventListener('click', function(e) {
        e.preventDefault();
        showSection('academics');
    });
    
    admissionsLink.addEventListener('click', function(e) {
        e.preventDefault();
        showSection('admissions');
    });
    
    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        showSection('login');
    });
    
    logoutLink.addEventListener('click', function(e) {
        e.preventDefault();
        logout();
    });
    
    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Simple validation
        if (!username || !password) {
            loginError.textContent = 'Please enter both Student ID and Password';
            return;
        }
        
        // Check credentials
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            loginError.textContent = '';
            // In a real app, you'd set a session or token here
            localStorage.setItem('currentUser', username);
            showDashboard();
        } else {
            loginError.textContent = 'Invalid Student ID or Password';
        }
    });
    
    // Show specific section
    function showSection(section) {
        // Hide all sections
        homeSection.style.display = 'none';
        aboutSection.style.display = 'none';
        academicsSection.style.display = 'none';
        admissionsSection.style.display = 'none';
        loginSection.style.display = 'none';
        
        // Show selected section
        switch(section) {
            case 'home':
                homeSection.style.display = 'block';
                logoutLink.style.display = 'none';
                loginLink.style.display = 'inline';
                document.title = 'University Management System';
                break;
            case 'about':
                aboutSection.style.display = 'block';
                logoutLink.style.display = 'none';
                loginLink.style.display = 'inline';
                document.title = 'About University - University Management System';
                break;
            case 'academics':
                academicsSection.style.display = 'block';
                logoutLink.style.display = 'none';
                loginLink.style.display = 'inline';
                document.title = 'Academics - University Management System';
                break;
            case 'admissions':
                admissionsSection.style.display = 'block';
                logoutLink.style.display = 'none';
                loginLink.style.display = 'inline';
                document.title = 'Admissions - University Management System';
                break;
            case 'login':
                loginSection.style.display = 'block';
                logoutLink.style.display = 'none';
                loginLink.style.display = 'inline';
                document.title = 'Login - University Management System';
                break;
        }
    }
    
    // Show dashboard after login
    function showDashboard() {
        // Clear form
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        
        // Show home section with dashboard content
        homeSection.innerHTML = `
            <div class="hero">
                <div class="hero-text">
                    <h2>Welcome Back, Student!</h2>
                    <p>You have successfully logged in to the University Portal</p>
                    <a href="#academics" class="btn-primary">View My Courses</a>
                </div>
                <div class="hero-image">
                    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiMxYTJhNmMiIGQ9Ik0xMiAyQzYuNDggMiAyaDQuNWMuNTUgMCAxIC40NSAxIDF2MTJjMCAuNTUtLjQ1IDEtMSAxaC00LjVjLS41NSAwLTEtLjQ1LTEtMVYzYzAtLjU1LjQ1LTEgMS0xem0wIDEwYzEuMSAwIDIuMi0uOSAyLjItMi4yIDAtMS4xLS45LTIuMi0yLjItMi4yLTEuMSAwLTIuMi45LTIuMiAyLjIgMCAxLjEuOSAyLjIgMi4yIDIuMnoiLz48cGF0aCBmaWxsPSIjMmYyZjJmIiBkPSJNMTEuNSAzLjVhMS41IDEuNSAwIDAgMC0xLjUgMS41djEwLjVhMS41IDEuNSAwIDAgMCAxLjUgMS41aDEwLjVhMS41IDEuNSAwIDAgMCAxLjUtMS41VjMuNUExLjUgMS41IDAgMCAwIDE0LjUgMS41aC0zLjV6Ii8+PC9zdmc+" alt="Student Portal">
                </div>
            </div>
            
            <div class="features">
                <div class="feature-card">
                    <i class="fas fa-calendar-alt fa-3x"></i>
                    <h3>Class Schedule</h3>
                    <p>View your upcoming classes and exam schedule</p>
                </div>
                <div class="feature-card">
                    <i class="fas fa-file-alt fa-3x"></i>
                    <h3>Grades</h3>
                    <p>Check your academic performance and grades</p>
                </div>
                <div class="feature-card">
                    <i class="fas fa-book fa-3x"></i>
                    <h3>Course Materials</h3>
                    <p>Access lecture notes and course resources</p>
                </div>
            </div>
            
            <div class="stats">
                <div class="stat-item">
                    <h3>3.8</h3>
                    <p>GPA</p>
                </div>
                <div class="stat-item">
                    <h3>12</h3>
                    <p>Courses</p>
                </div>
                <div class="stat-item">
                    <h3>5</h3>
                    <p>Completed</p>
                </div>
                <div class="stat-item">
                    <h3>15</h3>
                    <p>Remaining</p>
                </div>
            </div>
        `;
        homeSection.style.display = 'block';
        logoutLink.style.display = 'inline';
        loginLink.style.display = 'none';
        document.title = 'Dashboard - University Management System';
    }
    
    // Logout function
    function logout() {
        localStorage.removeItem('currentUser');
        showSection('home');
    }
    
    // Initialize the page
    showSection('home');
});
