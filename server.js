// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const fs = require('fs');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// const FILE_PATH = './students.json';

// // פונקציות עזר לקריאה/כתיבה
// function readStudents() {
//   try {
//     const data = fs.readFileSync(FILE_PATH, 'utf8');
//     return JSON.parse(data);
//   } catch (err) {
//     return [];
//   }
// }

// function writeStudents(students) {
//   fs.writeFileSync(FILE_PATH, JSON.stringify(students, null, 2));
// }

// // GET all students
// app.get('/students', (req, res) => {
//   const students = readStudents();
//   res.json(students);
// });

// // GET student by id
// app.get('/students/:id', (req, res) => {
//   const students = readStudents();
//   const student = students.find(s => s.id == req.params.id);
//   if (student) res.json(student);
//   else res.status(404).json({ error: "Student not found" });
// });

// // POST create new student
// app.post('/students', (req, res) => {
//   const students = readStudents();
//   const newStudent = { ...req.body, id: students.length ? students[students.length - 1].id + 1 : 1 };
//   students.push(newStudent);
//   writeStudents(students);
//   res.status(201).json(newStudent);
// });

// // PUT update student
// app.put('/students/:id', (req, res) => {
//   const students = readStudents();
//   const index = students.findIndex(s => s.id == req.params.id);
//   if (index !== -1) {
//     students[index] = { ...students[index], ...req.body };
//     writeStudents(students);
//     res.json(students[index]);
//   } else {
//     res.status(404).json({ error: "Student not found" });
//   }
// });

// // DELETE student
// app.delete('/students/:id', (req, res) => {
//   const students = readStudents();
//   const index = students.findIndex(s => s.id == req.params.id);
//   if (index !== -1) {
//     const deleted = students.splice(index, 1);
//     writeStudents(students);
//     res.json(deleted[0]);
//   } else {
//     res.status(404).json({ error: "Student not found" });
//   }
// });

// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Student API running on port ${PORT}`));




const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ====================== STUDENTS ======================

const STUDENTS_PATH = './students.json';

function readStudents() {
  try {
    const data = fs.readFileSync(STUDENTS_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeStudents(students) {
  fs.writeFileSync(STUDENTS_PATH, JSON.stringify(students, null, 2));
}

app.get('/students', (req, res) => {
  res.json(readStudents());
});

app.get('/students/:id', (req, res) => {
  const students = readStudents();
  const student = students.find(s => s.id == req.params.id);
  student ? res.json(student) : res.status(404).json({ error: "Student not found" });
});

app.post('/students', (req, res) => {
  const students = readStudents();
  const newStudent = { ...req.body, id: students.length ? students[students.length - 1].id + 1 : 1 };
  students.push(newStudent);
  writeStudents(students);
  res.status(201).json(newStudent);
});

// ====================== COURSES ======================

const COURSES_PATH = './courses.json';

function readCourses() {
  try {
    const data = fs.readFileSync(COURSES_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeCourses(courses) {
  fs.writeFileSync(COURSES_PATH, JSON.stringify(courses, null, 2));
}

app.get('/courses', (req, res) => {
  res.json(readCourses());
});

app.get('/courses/:id', (req, res) => {
  const courses = readCourses();
  const course = courses.find(c => c.id == req.params.id);
  course ? res.json(course) : res.status(404).json({ error: "Course not found" });
});

app.post('/courses', (req, res) => {
  const courses = readCourses();
  const newCourse = { ...req.body, id: courses.length ? courses[courses.length - 1].id + 1 : 1 };
  courses.push(newCourse);
  writeCourses(courses);
  res.status(201).json(newCourse);
});

// ====================== SERVER ======================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Student API running on port ${PORT}`));