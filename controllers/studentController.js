const Student = require("../models/studentModel");

// Controller function to get all students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.getAll();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to create a new student
exports.createStudent = async (req, res) => {
  try {
    const { name, email, cpf } = req.body;
    const newStudent = await Student.create({ name, email, cpf });
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to update a student by ID
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, cpf } = req.body;
    const updatedStudent = await Student.update(id, { name, email, cpf });
    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to delete a student by ID
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await Student.delete(id);
    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
