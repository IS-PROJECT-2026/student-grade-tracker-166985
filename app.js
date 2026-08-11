let students = [];

const form = document.getElementById("addStudentForm");
const tableBody = document.getElementById("studentTableBody");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("studentName").value;
    const id = document.getElementById("studentId").value;
    const course = document.getElementById("courseName").value;
    const grade = document.getElementById("grade").value;

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
        `;

        tableBody.appendChild(row);
    });
}