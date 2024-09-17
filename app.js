const express = require('express');
const cors = require('cors'); // Import the cors package

const app = express();
const port = process.env.PORT || 3000;

// Middleware to handle JSON data
app.use(express.json());
app.use(cors()); // Enable CORS for all requests

// Simulated Database (JSON file as "database")
let students = [
  {
    id: 1,
    name: 'محمد احمد',
    address: 'شارع الهلالي',
    nationalId: '12345678901234',
    email: 'example@example.com',
    birthDate: '23/01/2008',
    phone: '01012345678',
    govern: 'أسيوط',
    religion: 'مسلم',
    gender: 'ذكر',
    parent: {
      name: 'احمد ماجد',
      employee: 'مهندس',
      nationalId: '23456789012345',
      studentRelation: 'الوالد',
      address: 'شارع الهلالي',
    },
    military: {
      number: '111/222/333',
      postNumber: '123',
      postDate: '23/01/2021',
      status: 'موجل له بالمعهد',
      wantedYear: '25',
      lastPostYear: '2027',
      militaryNotes: 'ملاحظات عسكرية',
    },
    previousEducation: {
      education: 'دبلوم صنايع',
      gradYear: '2017/2018',
    },
    recentEducation: {
      divisionName: 'الذكاء الأصطناعي',
      divisionId: 101,
      status: 'مستجد',
      level: 'الأولي',
      term: 'أول',
    },
  },
  {
    id: 2,
    name: 'مي علي',
    address: 'شارع النميس',
    nationalId: '98765432101234',
    email: 'example2@example.com',
    birthDate: '12/12/2008',
    phone: '01187654321',
    govern: 'القاهرة',
    religion: 'مسلم',
    gender: 'انثى',
    parent: {
      name: 'ماجد رامي',
      employee: 'طبيب',
      nationalId: '34567890123456',
      studentRelation: 'الوالد',
      address: 'شارع النميس',
    },
    military: {
      number: '222/333/444',
      postNumber: '456',
      postDate: '12/12/2021',
      status: 'موجل له بالمعهد',
      wantedYear: '26',
      lastPostYear: '2026',
      militaryNotes: 'ملاحظات عسكرية أخرى',
    },
    previousEducation: {
      education: 'دبلوم تجارة',
      gradYear: '2018/2019',
    },
    recentEducation: {
      divisionName: 'تكنولوجيا الاتصالات',
      divisionId: 102,
      status: 'باقي للإعادة',
      level: 'الثانية',
      term: 'ثاني',
    },
  },
];

// GET route to retrieve all students
app.get('/students', (req, res) => {
  res.json(students);
});

// GET route to retrieve a specific student by ID
app.get('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  res.json(student);
});

// POST route to add a new student
app.post('/students', (req, res) => {
  const newStudent = {
    id: students.length + 1,
    name: req.body.name,
    address: req.body.address,
    nationalId: req.body.nationalId,
    email: req.body.email,
    birthDate: req.body.birthDate,
    phone: req.body.phone,
    govern: req.body.govern,
    religion: req.body.religion,
    gender: req.body.gender,
    parent: {
      name: req.body.parent.name,
      employee: req.body.parent.employee,
      nationalId: req.body.parent.nationalId,
      studentRelation: req.body.parent.studentRelation,
      address: req.body.parent.address,
    },
    military: {
      number: req.body.military.number,
      postNumber: req.body.military.postNumber,
      postDate: req.body.military.postDate,
      status: req.body.military.status,
      wantedYear: req.body.military.wantedYear,
      lastPostYear: req.body.military.lastPostYear,
      militaryNotes: req.body.military.militaryNotes,
    },
    previousEducation: {
      education: req.body.previousEducation.education,
      gradYear: req.body.previousEducation.gradYear,
    },
    recentEducation: {
      divisionName: req.body.recentEducation.divisionName,
      divisionId: req.body.recentEducation.divisionId,
      status: req.body.recentEducation.status,
      level: req.body.recentEducation.level,
      term: req.body.recentEducation.term,
    },
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT route to update a student's information
app.put('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const studentIndex = students.findIndex((s) => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }

  // Update student information
  students[studentIndex] = {
    ...students[studentIndex], // Keep the existing properties
    ...req.body, // Overwrite with the new values
  };

  res.json(students[studentIndex]);
});

// DELETE route to remove a student by ID
app.delete('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const studentIndex = students.findIndex((s) => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }

  students.splice(studentIndex, 1);
  res.status(204).send(); // No content to return, but request was successful
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
