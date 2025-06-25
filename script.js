/**************Ejemplo 1: Renderizar estudiantes y agregar nuevo por medio de formulario ***********/

// Array de estudiantes de ejemplo
const students = [
  {
    name: "Alex",
    age: 22,
    email: "alex@example.com",
    course: "Web Development",
  },
  {
    name: "Maria",
    age: 22,
    email: "maria@example.com",
    course: "Data Science",
  },
  {
    name: "John",
    age: 25,
    email: "john@example.com",
    course: "Web Development",
  },
  {
    name: "Sophia",
    age: 25,
    email: "sophia@example.com",
    course: "UI/UX Design",
  },
  {
    name: "Michael",
    age: 27,
    email: "michael@example.com",
    course: "Cybersecurity",
  },
  {
    name: "Emma",
    age: 26,
    email: "emma@example.com",
    course: "Machine Learning",
  },
];

// Función para renderizar la lista de estudiantes
function renderStudentList(studentData) {
  const studentList = document.getElementById("students");
  studentList.innerHTML = ""; // Limpiar la lista

  studentData.forEach((student, index) => {
    const article = document.createElement("article");
    article.innerHTML = `
      <p><b>Name:</b> ${student.name}</p>
      <p><b>Age:</b> ${student.age}</p>
      <p><b>Email:</b> ${student.email}</p>
      <p><b>Course:</b> ${student.course}</p>
      <button class="delete-button">Delete</button>
      <button class="edit-button">Edit</button>
    `;

    // Lógica para botón de borrar
    const deleteButton = article.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
      students.splice(index, 1); // Borrar estudiante del array
      article.remove(); // Borrar el elemento del DOM
    });

    // Lógica para botón de editar
    const editButton = article.querySelector(".edit-button");
    editButton.addEventListener("click", () => {
      article.innerHTML = `
        <form class="edit-form">
          <label>Name: <input type="text" name="name" value="${student.name}" required></label>
          <label>Age: <input type="number" name="age" value="${student.age}" required></label>
          <label>Email: <input type="email" name="email" value="${student.email}" required></label>
          <label>Course: <input type="text" name="course" value="${student.course}" required></label>
          <button type="submit">Save</button>
        </form>
      `;

      const editForm = article.querySelector(".edit-form");
      editForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Evitar el comportamiento por defecto del formulario

        // Actualizar datos del estudiante
        student.name = editForm.elements.name.value.trim();
        student.age = parseInt(editForm.elements.age.value.trim());
        student.email = editForm.elements.email.value.trim();
        student.course = editForm.elements.course.value.trim();

        // Renderizar el artículo actualizado
        renderStudentList(studentData);
      });
    });

    // Añadir article al DOM
    studentList.appendChild(article);
  });
}

// Evento para manejar el envío del formulario
document.getElementById("student-form").addEventListener("submit", (event) => {
  event.preventDefault(); // Evitar el comportamiento por defecto del formulario

  const name = event.target.elements.name.value.trim();
  const age = parseInt(event.target.elements.age.value.trim());
  const email = event.target.elements.email.value.trim();
  const course = event.target.elements.course.value.trim();

  if (name && age && email && course) {
    const newStudent = { name, age, email, course };
    students.push(newStudent);
    renderStudentList(students); // Actualizar la lista de estudiantes
    event.target.reset(); // Limpiar el formulario
  }
});


/**************Ejemplo 2: Filtro único por email ***************/

function filterByEmail(email) {
    for (let i = 0; i < students.length; i++) {
        if (students[i].email === email) {
            return students[i];
        }
    }
    return null; // Si no se encuentra el estudiante
}

// Lo mismo con método find() de array
// Función para buscar un estudiante por email
// function filterByEmail(email) {
//     return students.find((student) => student.email.toLowerCase() === email.toLowerCase());
// }

// Evento para manejar el click en el botón de búsqueda por email
document.getElementById("email-search-button").addEventListener("click", () => {
    const email = document.getElementById("email-filter").value.trim();
    const student = filterByEmail(email);

    const filteredStudentSection = document.getElementById("filtered-student");
    filteredStudentSection.innerHTML = ""; // Limpiar la sección

    if (student) {
        const article = document.createElement("article");
        article.innerHTML = `
            <p><b>Name:</b> ${student.name}</p>
            <p><b>Age:</b> ${student.age}</p>
            <p><b>Email:</b> ${student.email}</p>
            <p><b>Course:</b> ${student.course}</p>
        `;
        filteredStudentSection.appendChild(article);
    } else {
        filteredStudentSection.innerHTML = "<p>No student found with this email.</p>";
    }
});

// Evento para manejar el clic en el botón de borrar el resultado del filtro por email
document.getElementById("email-clear-button").addEventListener("click", () => {
    document.getElementById("email-filter").value = ""; // Limpiar el input
    const filteredStudentSection = document.getElementById("filtered-student");
    filteredStudentSection.innerHTML = ""; // Limpiar la sección de resultados
});


/**************Ejemplo 3: Filtros combinados. Uso de filter()  ***************/

// Función para filtrar estudiantes
function filterStudents(filterAge, filterCourse, searchEmail) {
  return students.filter(
    (student) =>
      (filterAge === "all" || student.age === parseInt(filterAge)) &&
      (filterCourse === "all" || student.course === filterCourse) &&
      (searchEmail === "" || student.email.toLowerCase().includes(searchEmail.toLowerCase()))
  );
}

// Evento para manejar el cambio en el filtro de edad
document.getElementById("age-filter").addEventListener("change", (event) => {
  const courseFilter = document.getElementById("course-filter").value;
  const emailSearch = document.getElementById("email-search").value;
  const filteredStudents = filterStudents(event.target.value, courseFilter, emailSearch);
  renderStudentList(filteredStudents);
});

// Evento para manejar el cambio en el filtro de curso
document.getElementById("course-filter").addEventListener("change", (event) => {
  const ageFilter = document.getElementById("age-filter").value;
  const emailSearch = document.getElementById("email-search").value;
  const filteredStudents = filterStudents(ageFilter, event.target.value, emailSearch);
  renderStudentList(filteredStudents);
});

// Evento para manejar la búsqueda por email
document.getElementById("email-search").addEventListener("input", (event) => {
  const ageFilter = document.getElementById("age-filter").value;
  const courseFilter = document.getElementById("course-filter").value;
  const filteredStudents = filterStudents(ageFilter, courseFilter, event.target.value);
  renderStudentList(filteredStudents);
});

// Renderizar la lista al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    renderStudentList(students);
});