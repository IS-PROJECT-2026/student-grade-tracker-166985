let students = [];

const form = document.getElementById("addStudentForm");
const tableBody = document.getElementById("studentTableBody");

function validateStudent(name, id, course, grade) {
    if (name.trim() === "") {
        alert("Student name is required.");
        return false;
    }

    if (id.trim() === "") {
        alert("Student ID is required.");
        return false;
    }

    if (!/^[A-Za-z0-9-]+$/.test(id.trim())) {
        alert("Student ID can only contain letters, numbers, and hyphens.");
        return false;
    }

    if (course.trim() === "") {
        alert("Course name is required.");
        return false;
    }

    const numericGrade = Number(grade);

    if (grade === "" || isNaN(numericGrade) || numericGrade < 0 || numericGrade > 100) {
        alert("Grade must be a number between 0 and 100.");
        return false;
    }

    return true;
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("studentName").value;
    const id = document.getElementById("studentId").value;
    const course = document.getElementById("courseName").value;
    const grade = document.getElementById("grade").value;

    if (!validateStudent(name, id, course, grade)) {
        return;
    }

    const student = {
        name: name,
        id: id,
        course: course,
        grade: grade
    };

    students.push(student);

    displayStudents();

    form.reset();
});

function displayStudents() {
    tableBody.innerHTML = "";

    students.forEach(function(student) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.course}</td>
            <td>${student.grade}</td>
            <td>
                <button onclick="editStudent(${students.indexOf(student)})">Edit</button>
                <button onclick="deleteStudent(${students.indexOf(student)})">Delete</button>
            </td>
            `;

        tableBody.appendChild(row);
    });
}

function editStudent(index) {
    const student = students[index];

    const newName = prompt("Enter student name:", student.name);
    const newId = prompt("Enter student ID:", student.id);
    const newCourse = prompt("Enter course:", student.course);
    const newGrade = prompt("Enter grade:", student.grade);

    if (validateStudent(newName, newId, newCourse, newGrade)) {
        students[index] = {
            name: newName,
            id: newId,
            course: newCourse,
            grade: newGrade
        };

        displayStudents();
    }
}

function deleteStudent(index) {
    const confirmed = confirm("Are you sure you want to delete this student?");

    if (confirmed) {
        students.splice(index, 1);

        if (students.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center;">
                        No students added yet
                    </td>
                </tr>
            `;
        } else {
            displayStudents();
        }
    }
}