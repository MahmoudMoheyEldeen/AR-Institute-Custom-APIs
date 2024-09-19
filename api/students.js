require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Create an Express application
const app = express();

// Middleware to handle JSON data and enable CORS
app.use(express.json());
app.use(cors()); // Enable CORS for all requests

// MongoDB connection (replace 'your_mongo_connection_string' with your actual MongoDB Atlas connection string)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB Atlas');
});

// Define the Student Schema
const studentSchema = new mongoose.Schema({
  id: Number,
  name: String,
  address: String,
  nationalId: String,
  email: String,
  birthDate: String,
  phone: String,
  govern: String,
  religion: String,
  gender: String,
  parent: {
    name: String,
    employee: String,
    nationalId: String,
    studentRelation: String,
    address: String,
  },
  military: {
    number: String,
    postNumber: String,
    postDate: String,
    status: String,
    wantedYear: String,
    lastPostYear: String,
    militaryNotes: String,
  },
  previousEducation: {
    education: String,
    gradYear: String,
  },
  recentEducation: {
    divisionName: String,
    divisionId: Number,
    status: String,
    level: String,
    term: String,
  },
});

// Create the Student model from the schema
const Student = mongoose.model('Student', studentSchema);

// API Routes

// Route to handle root URL
app.get('/', (req, res) => {
  res.send('API is running');
});

// GET route to retrieve all students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET route to retrieve a specific student by ID
app.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findOne({ id: req.params.id });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST route to add a new student
app.post('/students', async (req, res) => {
  const student = new Student({
    id: req.body.id,
    name: req.body.name,
    address: req.body.address,
    nationalId: req.body.nationalId,
    email: req.body.email,
    birthDate: req.body.birthDate,
    phone: req.body.phone,
    govern: req.body.govern,
    religion: req.body.religion,
    gender: req.body.gender,
    parent: req.body.parent,
    military: req.body.military,
    previousEducation: req.body.previousEducation,
    recentEducation: req.body.recentEducation,
  });

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT route to update a student's information
app.put('/students/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedStudent)
      return res.status(404).json({ message: 'Student not found' });
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE route to remove a student by ID
app.delete('/students/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findOneAndDelete({
      id: req.params.id,
    });
    if (!deletedStudent)
      return res.status(404).json({ message: 'Student not found' });
    res.status(204).send(); // No content response
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Set the port dynamically using the environment variable or fallback to 3000
const port = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
