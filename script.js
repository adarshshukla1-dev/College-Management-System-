document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.main-nav ul li a');
    const contentSections = document.querySelectorAll('.content-section');
    const loginLogoutBtn = document.getElementById('loginLogoutBtn');

    let isLoggedIn = false; // Simulate login state

    // --- Dummy Data (In a real system, this would come from a backend API) ---
    let dummyStudents = [
        { id: 'S001', name: 'Alice Smith', major: 'Computer Science', email: 'alice.s@college.edu' },
        { id: 'S002', name: 'Bob Johnson', major: 'Electrical Engineering', email: 'bob.j@college.edu' },
        { id: 'S003', name: 'Charlie Brown', major: 'Business Administration', email: 'charlie.b@college.edu' },
        { id: 'S004', name: 'Diana Prince', major: 'Physics', email: 'diana.p@college.edu' }
    ];

    let dummyCourses = [
        { code: 'CS101', title: 'Introduction to Programming', credits: 3, department: 'Computer Science' },
        { code: 'EE201', title: 'Circuit Analysis', credits: 4, department: 'Electrical Engineering' },
        { code: 'BA301', title: 'Marketing Principles', credits: 3, department: 'Business' },
        { code: 'PH101', title: 'General Physics I', credits: 4, department: 'Physics' }
    ];

    let dummyFaculty = [
        { id: 'F001', name: 'Dr. Emily White', department: 'Computer Science', email: 'emily.w@college.edu' },
        { id: 'F002', name: 'Prof. David Green', department: 'Electrical Engineering', email: 'david.g@college.edu' },
        { id: 'F003', name: 'Dr. Sarah Black', department: 'Business', email: 'sarah.b@college.edu' }
    ];

    let dummyBooks = [
        { id: 'B001', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic' },
        { id: 'B002', title: '1984', author: 'George Orwell', genre: 'Dystopian' },
        { id: 'B003', title: 'Sapiens', author: 'Yuval Noah Harari', genre: 'Non-fiction' }
    ];

    let dummyGrades = [
        { studentId: 'S001', studentName: 'Alice Smith', courseCode: 'CS101', courseTitle: 'Intro to Programming', grade: 'A', date: '2023-05-10' },
        { studentId: 'S002', studentName: 'Bob Johnson', courseCode: 'EE201', courseTitle: 'Circuit Analysis', grade: 'B+', date: '2023-05-12' },
        { studentId: 'S001', studentName: 'Alice Smith', courseCode: 'PH101', courseTitle: 'General Physics I', grade: 'B', date: '2023-05-11' }
    ];

    // --- Utility Functions ---
    function generateId(prefix, currentArray) {
        const lastIdNum = currentArray.length > 0
            ? parseInt(currentArray[currentArray.length - 1].id.replace(prefix, ''))
            : 0;
        return `${prefix}${(lastIdNum + 1).toString().padStart(3, '0')}`;
    }

    function showMessage(message, type = 'success') {
        // In a real app, you'd show a temporary alert/toast message
        console.log(`[${type.toUpperCase()}]: ${message}`);
        alert(message); // For demonstration
    }

    // --- Navigation Logic ---
    function activateSection(sectionId) {
        navLinks.forEach(nav => nav.classList.remove('active'));
        contentSections.forEach(section => section.classList.remove('active'));

        const targetLink = document.querySelector(`.main-nav ul li a[data-section="${sectionId}"]`);
        const targetSection = document.getElementById(sectionId);

        if (targetLink) targetLink.classList.add('active');
        if (targetSection) targetSection.classList.add('active');

        // Call specific load functions for active section
        if (sectionId === 'students') loadStudents();
        else if (sectionId === 'courses') loadCourses();
        else if (sectionId === 'faculty') loadFaculty();
        else if (sectionId === 'dashboard') loadDashboardStats();
        else if (sectionId === 'grades') { loadGrades(); populateGradeDropdowns(); }
        else if (sectionId === 'library') loadBooks();
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSectionId = e.target.dataset.section;
            activateSection(targetSectionId);
        });
    });

    // --- Login/Logout Simulation ---
    function updateLoginButton() {
        if (isLoggedIn) {
            loginLogoutBtn.textContent = 'Logout';
            loginLogoutBtn.classList.remove('login');
            loginLogoutBtn.classList.add('logout');
        } else {
            loginLogoutBtn.textContent = 'Login';
            loginLogoutBtn.classList.remove('logout');
            loginLogoutBtn.classList.add('login');
        }
    }

    loginLogoutBtn.addEventListener('click', () => {
        isLoggedIn = !isLoggedIn;
        updateLoginButton();
        if (isLoggedIn) {
            showMessage('Logged in successfully!', 'success');
        } else {
            showMessage('Logged out.', 'info');
        }
    });

    // --- Dashboard Functions ---
    function loadDashboardStats() {
        document.getElementById('totalStudents').textContent = dummyStudents.length;
        document.getElementById('totalCourses').textContent = dummyCourses.length;
        document.getElementById('totalFaculty').textContent = dummyFaculty.length;
        // Admissions stats are static for this demo, but could be dynamic
        // Library stats are static for this demo, but could be dynamic
    }

    // --- Modals Logic ---
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-button');

    function openModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
    }

    function closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
        // Reset forms when closing
        const form = document.getElementById(modalId).querySelector('form');
        if (form) form.reset();
    }

    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            closeModal(e.target.closest('.modal').id);
        });
    });

    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target == modal) {
                closeModal(modal.id);
            }
        });
    });

    // --- Student Management ---
    const studentsTableBody = document.getElementById('studentsTableBody');
    const addStudentBtn = document.getElementById('addStudentBtn');
    const studentModal = document.getElementById('studentModal');
    const studentModalTitle = document.getElementById('studentModalTitle');
    const studentForm = document.getElementById('studentForm');
    const studentIdHidden = document.getElementById('studentIdHidden');
    const studentNameInput = document.getElementById('studentName');
    const studentMajorInput = document.getElementById('studentMajor');
    const studentEmailInput = document.getElementById('studentEmail');
    const studentSearchInput = document.getElementById('studentSearch');

    function loadStudents(filter = '') {
        studentsTableBody.innerHTML = '';
        const filteredStudents = dummyStudents.filter(student =>
            student.name.toLowerCase().includes(filter.toLowerCase()) ||
            student.id.toLowerCase().includes(filter.toLowerCase()) ||
            student.major.toLowerCase().includes(filter.toLowerCase())
        );

        if (filteredStudents.length === 0) {
            studentsTableBody.innerHTML = '<tr><td colspan="5">No student data available.</td></tr>';
            return;
        }

        filteredStudents.forEach(student => {
            const row = studentsTableBody.insertRow();
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.major}</td>
                <td>${student.email}</td>
                <td>
                    <button class="action-button edit" data-id="${student.id}">Edit</button>
                    <button class="action-button delete" data-id="${student.id}">Delete</button>
                </td>
            `;
        });

        // Add event listeners for edit/delete buttons
        studentsTableBody.querySelectorAll('.action-button.edit').forEach(button => {
            button.addEventListener('click', (e) => editStudent(e.target.dataset.id));
        });
        studentsTableBody.querySelectorAll('.action-button.delete').forEach(button => {
            button.addEventListener('click', (e) => deleteStudent(e.target.dataset.id));
        });
    }

    addStudentBtn.addEventListener('click', () => {
        studentModalTitle.textContent = 'Add New Student';
        studentIdHidden.value = '';
        studentForm.reset();
        openModal('studentModal');
    });

    studentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = studentIdHidden.value;
        const name = studentNameInput.value;
        const major = studentMajorInput.value;
        const email = studentEmailInput.value;

        if (id) {
            // Edit existing student
            const index = dummyStudents.findIndex(s => s.id === id);
            if (index !== -1) {
                dummyStudents[index] = { id, name, major, email };
                showMessage(`Student ${name} updated successfully!`, 'success');
            }
        } else {
            // Add new student
            const newId = generateId('S', dummyStudents);
            dummyStudents.push({ id: newId, name, major, email });
            showMessage(`Student ${name} added successfully with ID ${newId}!`, 'success');
        }
        closeModal('studentModal');
        loadStudents();
        loadDashboardStats();
        populateGradeDropdowns(); // Update student dropdown
    });

    function editStudent(id) {
        const student = dummyStudents.find(s => s.id === id);
        if (student) {
            studentModalTitle.textContent = 'Edit Student';
            studentIdHidden.value = student.id;
            studentNameInput.value = student.name;
            studentMajorInput.value = student.major;
            studentEmailInput.value = student.email;
            openModal('studentModal');
        }
    }

    function deleteStudent(id) {
        if (confirm(`Are you sure you want to delete student ${id}?`)) {
            dummyStudents = dummyStudents.filter(s => s.id !== id);
            showMessage(`Student ${id} deleted.`, 'info');
            loadStudents();
            loadDashboardStats();
            populateGradeDropdowns(); // Update student dropdown
        }
    }

    studentSearchInput.addEventListener('keyup', () => {
        loadStudents(studentSearchInput.value);
    });

    // --- Course Management ---
    const coursesTableBody = document.getElementById('coursesTableBody');
    const addCourseBtn = document.getElementById('addCourseBtn');
    const courseModal = document.getElementById('courseModal');
    const courseModalTitle = document.getElementById('courseModalTitle');
    const courseForm = document.getElementById('courseForm');
    const courseCodeHidden = document.getElementById('courseCodeHidden');
    const courseCodeInput = document.getElementById('courseCode');
    const courseTitleInput = document.getElementById('courseTitle');
    const courseCreditsInput = document.getElementById('courseCredits');
    const courseDepartmentInput = document.getElementById('courseDepartment');
    const courseSearchInput = document.getElementById('courseSearch');

    function loadCourses(filter = '') {
        coursesTableBody.innerHTML = '';
        const filteredCourses = dummyCourses.filter(course =>
            course.title.toLowerCase().includes(filter.toLowerCase()) ||
            course.code.toLowerCase().includes(filter.toLowerCase()) ||
            course.department.toLowerCase().includes(filter.toLowerCase())
        );

        if (filteredCourses.length === 0) {
            coursesTableBody.innerHTML = '<tr><td colspan="5">No course data available.</td></tr>';
            return;
        }

        filteredCourses.forEach(course => {
            const row = coursesTableBody.insertRow();
            row.innerHTML = `
                <td>${course.code}</td>
                <td>${course.title}</td>
                <td>${course.credits}</td>
                <td>${course.department}</td>
                <td>
                    <button class="action-button edit" data-code="${course.code}">Edit</button>
                    <button class="action-button delete" data-code="${course.code}">Delete</button>
                </td>
            `;
        });

        coursesTableBody.querySelectorAll('.action-button.edit').forEach(button => {
            button.addEventListener('click', (e) => editCourse(e.target.dataset.code));
        });
        coursesTableBody.querySelectorAll('.action-button.delete').forEach(button => {
            button.addEventListener('click', (e) => deleteCourse(e.target.dataset.code));
        });
    }

    addCourseBtn.addEventListener('click', () => {
        courseModalTitle.textContent = 'Add New Course';
        courseCodeHidden.value = '';
        courseForm.reset();
        courseCodeInput.removeAttribute('readonly'); // Allow editing code for new course
        openModal('courseModal');
    });

    courseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const code = courseCodeInput.value.toUpperCase();
        const title = courseTitleInput.value;
        const credits = parseInt(courseCreditsInput.value);
        const department = courseDepartmentInput.value;

        if (courseCodeHidden.value) {
            // Edit existing course
            const index = dummyCourses.findIndex(c => c.code === courseCodeHidden.value);
            if (index !== -1) {
                dummyCourses[index] = { code, title, credits, department };
                showMessage(`Course ${title} updated successfully!`, 'success');
            }
        } else {
            // Add new course
            if (dummyCourses.some(c => c.code === code)) {
                showMessage(`Course with code ${code} already exists!`, 'error');
                return;
            }
            dummyCourses.push({ code, title, credits, department });
            showMessage(`Course ${title} added successfully!`, 'success');
        }
        closeModal('courseModal');
        loadCourses();
        loadDashboardStats();
        populateGradeDropdowns(); // Update course dropdown
    });

    function editCourse(code) {
        const course = dummyCourses.find(c => c.code === code);
        if (course) {
            courseModalTitle.textContent = 'Edit Course';
            courseCodeHidden.value = course.code;
            courseCodeInput.value = course.code;
            courseCodeInput.setAttribute('readonly', 'readonly'); // Prevent editing code
            courseTitleInput.value = course.title;
            courseCreditsInput.value = course.credits;
            courseDepartmentInput.value = course.department;
            openModal('courseModal');
        }
    }

    function deleteCourse(code) {
        if (confirm(`Are you sure you want to delete course ${code}?`)) {
            dummyCourses = dummyCourses.filter(c => c.code !== code);
            showMessage(`Course ${code} deleted.`, 'info');
            loadCourses();
            loadDashboardStats();
            populateGradeDropdowns(); // Update course dropdown
        }
    }

    courseSearchInput.addEventListener('keyup', () => {
        loadCourses(courseSearchInput.value);
    });

    // --- Faculty Management ---
    const facultyTableBody = document.getElementById('facultyTableBody');
    const addFacultyBtn = document.getElementById('addFacultyBtn');
    const facultyModal = document.getElementById('facultyModal');
    const facultyModalTitle = document.getElementById('facultyModalTitle');
    const facultyForm = document.getElementById('facultyForm');
    const facultyIdHidden = document.getElementById('facultyIdHidden');
    const facultyNameInput = document.getElementById('facultyName');
    const facultyDepartmentInput = document.getElementById('facultyDepartment');
    const facultyEmailInput = document.getElementById('facultyEmail');
    const facultySearchInput = document.getElementById('facultySearch');

    function loadFaculty(filter = '') {
        facultyTableBody.innerHTML = '';
        const filteredFaculty = dummyFaculty.filter(faculty =>
            faculty.name.toLowerCase().includes(filter.toLowerCase()) ||
            faculty.id.toLowerCase().includes(filter.toLowerCase()) ||
            faculty.department.toLowerCase().includes(filter.toLowerCase())
        );

        if (filteredFaculty.length === 0) {
            facultyTableBody.innerHTML = '<tr><td colspan="5">No faculty data available.</td></tr>';
            return;
        }

        filteredFaculty.forEach(faculty => {
            const row = facultyTableBody.insertRow();
            row.innerHTML = `
                <td>${faculty.id}</td>
                <td>${faculty.name}</td>
                <td>${faculty.department}</td>
                <td>${faculty.email}</td>
                <td>
                    <button class="action-button edit" data-id="${faculty.id}">Edit</button>
                    <button class="action-button delete" data-id="${faculty.id}">Delete</button>
                </td>
            `;
        });

        facultyTableBody.querySelectorAll('.action-button.edit').forEach(button => {
            button.addEventListener('click', (e) => editFaculty(e.target.dataset.id));
        });
        facultyTableBody.querySelectorAll('.action-button.delete').forEach(button => {
            button.addEventListener('click', (e) => deleteFaculty(e.target.dataset.id));
        });
    }

    addFacultyBtn.addEventListener('click', () => {
        facultyModalTitle.textContent = 'Add New Faculty';
        facultyIdHidden.value = '';
        facultyForm.reset();
        openModal('facultyModal');
    });

    facultyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = facultyIdHidden.value;
        const name = facultyNameInput.value;
        const department = facultyDepartmentInput.value;
        const email = facultyEmailInput.value;

        if (id) {
            // Edit existing faculty
            const index = dummyFaculty.findIndex(f => f.id === id);
            if (index !== -1) {
                dummyFaculty[index] = { id, name, department, email };
                showMessage(`Faculty ${name} updated successfully!`, 'success');
            }
        } else {
            // Add new faculty
            const newId = generateId('F', dummyFaculty);
            dummyFaculty.push({ id: newId, name, department, email });
            showMessage(`Faculty ${name} added successfully with ID ${newId}!`, 'success');
        }
        closeModal('facultyModal');
        loadFaculty();
        loadDashboardStats();
    });

    function editFaculty(id) {
        const faculty = dummyFaculty.find(f => f.id === id);
        if (faculty) {
            facultyModalTitle.textContent = 'Edit Faculty';
            facultyIdHidden.value = faculty.id;
            facultyNameInput.value = faculty.name;
            facultyDepartmentInput.value = faculty.department;
            facultyEmailInput.value = faculty.email;
            openModal('facultyModal');
        }
    }

    function deleteFaculty(id) {
        if (confirm(`Are you sure you want to delete faculty ${id}?`)) {
            dummyFaculty = dummyFaculty.filter(f => f.id !== id);
            showMessage(`Faculty ${id} deleted.`, 'info');
            loadFaculty();
            loadDashboardStats();
        }
    }

    facultySearchInput.addEventListener('keyup', () => {
        loadFaculty(facultySearchInput.value);
    });

    // --- Admissions Management ---
    const admissionForm = document.getElementById('admissionForm');
    const applicantNameInput = document.getElementById('applicantName');
    const applicantEmailInput = document.getElementById('applicantEmail');
    const applicantMajorSelect = document.getElementById('applicantMajor');

    admissionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = applicantNameInput.value;
        const email = applicantEmailInput.value;
        const major = applicantMajorSelect.value;

        if (name && email && major) {
            showMessage(`Application for ${name} (${major}) submitted successfully!`, 'success');
            // In a real system, this would add to a list of applications
            admissionForm.reset();
        } else {
            showMessage('Please fill in all application fields.', 'error');
        }
    });

    // --- Grades Management ---
    const studentSelect = document.getElementById('studentSelect');
    const courseSelect = document.getElementById('courseSelect');
    const gradeEntryForm = document.getElementById('gradeEntryForm');
    const gradeInput = document.getElementById('gradeInput');
    const gradesTableBody = document.getElementById('gradesTableBody');

    function populateGradeDropdowns() {
        // Clear existing options except the first "Select..." one
        studentSelect.innerHTML = '<option value="">Select Student</option>';
        courseSelect.innerHTML = '<option value="">Select Course</option>';

        dummyStudents.forEach(student => {
            const option = document.createElement('option');
            option.value = student.id;
            option.textContent = `${student.name} (${student.id})`;
            studentSelect.appendChild(option);
        });

        dummyCourses.forEach(course => {
            const option = document.createElement('option');
            option.value = course.code;
            option.textContent = `${course.title} (${course.code})`;
            courseSelect.appendChild(option);
        });
    }

    function loadGrades() {
        gradesTableBody.innerHTML = '';
        if (dummyGrades.length === 0) {
            gradesTableBody.innerHTML = '<tr><td colspan="4">No grades recorded.</td></tr>';
            return;
        }

        dummyGrades.forEach(grade => {
            const row = gradesTableBody.insertRow();
            row.innerHTML = `
                <td>${grade.studentName}</td>
                <td>${grade.courseTitle}</td>
                <td>${grade.grade}</td>
                <td>${grade.date}</td>
            `;
        });
    }

    gradeEntryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const studentId = studentSelect.value;
        const courseCode = courseSelect.value;
        const grade = gradeInput.value;

        if (studentId && courseCode && grade) {
            const student = dummyStudents.find(s => s.id === studentId);
            const course = dummyCourses.find(c => c.code === courseCode);

            if (student && course) {
                const newGrade = {
                    studentId: student.id,
                    studentName: student.name,
                    courseCode: course.code,
                    courseTitle: course.title,
                    grade: grade,
                    date: new Date().toISOString().slice(0, 10) // YYYY-MM-DD
                };
                dummyGrades.push(newGrade);
                showMessage(`Grade ${grade} recorded for ${student.name} in ${course.title}.`, 'success');
                gradeEntryForm.reset();
                loadGrades();
            } else {
                showMessage('Selected student or course not found.', 'error');
            }
        } else {
            showMessage('Please select a student, course, and enter a grade.', 'error');
        }
    });

    // --- Library Management ---
    const booksTableBody = document.getElementById('booksTableBody');
    const addBookBtn = document.getElementById('addBookBtn');
    const bookModal = document.getElementById('bookModal');
    const bookModalTitle = document.getElementById('bookModalTitle');
    const bookForm = document.getElementById('bookForm');
    const bookIdHidden = document.getElementById('bookIdHidden');
    const bookTitleInput = document.getElementById('bookTitle');
    const bookAuthorInput = document.getElementById('bookAuthor');
    const bookGenreInput = document.getElementById('bookGenre');
    const bookSearchInput = document.getElementById('bookSearch');

    function loadBooks(filter = '') {
        booksTableBody.innerHTML = '';
        const filteredBooks = dummyBooks.filter(book =>
            book.title.toLowerCase().includes(filter.toLowerCase()) ||
            book.author.toLowerCase().includes(filter.toLowerCase()) ||
            book.genre.toLowerCase().includes(filter.toLowerCase())
        );

        if (filteredBooks.length === 0) {
            booksTableBody.innerHTML = '<tr><td colspan="5">No books available.</td></tr>';
            return;
        }

        filteredBooks.forEach(book => {
            const row = booksTableBody.insertRow();
            row.innerHTML = `
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.genre}</td>
                <td>
                    <button class="action-button edit" data-id="${book.id}">Edit</button>
                    <button class="action-button delete" data-id="${book.id}">Delete</button>
                </td>
            `;
        });

        booksTableBody.querySelectorAll('.action-button.edit').forEach(button => {
            button.addEventListener('click', (e) => editBook(e.target.dataset.id));
        });
        booksTableBody.querySelectorAll('.action-button.delete').forEach(button => {
            button.addEventListener('click', (e) => deleteBook(e.target.dataset.id));
        });
    }

    addBookBtn.addEventListener('click', () => {
        bookModalTitle.textContent = 'Add New Book';
        bookIdHidden.value = '';
        bookForm.reset();
        openModal('bookModal');
    });

    bookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = bookIdHidden.value;
        const title = bookTitleInput.value;
        const author = bookAuthorInput.value;
        const genre = bookGenreInput.value;

        if (id) {
            // Edit existing book
            const index = dummyBooks.findIndex(b => b.id === id);
            if (index !== -1) {
                dummyBooks[index] = { id, title, author, genre };
                showMessage(`Book "${title}" updated successfully!`, 'success');
            }
        } else {
            // Add new book
            const newId = generateId('B', dummyBooks);
            dummyBooks.push({ id: newId, title, author, genre });
            showMessage(`Book "${title}" added successfully with ID ${newId}!`, 'success');
        }
        closeModal('bookModal');
        loadBooks();
    });

    function editBook(id) {
        const book = dummyBooks.find(b => b.id === id);
        if (book) {
            bookModalTitle.textContent = 'Edit Book';
            bookIdHidden.value = book.id;
            bookTitleInput.value = book.title;
            bookAuthorInput.value = book.author;
            bookGenreInput.value = book.genre;
            openModal('bookModal');
        }
    }

    function deleteBook(id) {
        if (confirm(`Are you sure you want to delete book ${id}?`)) {
            dummyBooks = dummyBooks.filter(b => b.id !== id);
            showMessage(`Book ${id} deleted.`, 'info');
            loadBooks();
        }
    }

    bookSearchInput.addEventListener('keyup', () => {
        loadBooks(bookSearchInput.value);
    });


    // --- Initial Load ---
    updateLoginButton();
    activateSection('dashboard'); // Load dashboard data and activate section
});

