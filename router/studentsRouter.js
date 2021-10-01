const express = require('express');
const { Student } = require('../models/students');

const router = express.Router();

//Named Function
// Student Data
const studentList = async (req, res) => {
    const students = await Student.find()
        .sort({ name: 1 });
    res.send(students)
}
//New Student
const newStudent = async (req, res) => {
    //const student = req.body;
    const student = new Student(req.body);
    try {
        const result = await student.save();
        res.send(result);
    } catch (err) {
        const errMsg = [];
        for (field in err.errors) {
            errMsg.push(err.errors[field].message)
        }
        return res.status(400).send(errMsg)
    }

}
//Student Detail
const studentDetail = async (req, res) => {
    const id = req.params.id;
    try {
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).send("ID not found")
        }
        res.send(student);
    } catch (err) {
        return res.status(404).send("ID not found")
    }


}
//Update Student List
const studentUpdate = async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    try {
        const student = await Student.findByIdAndUpdate(id, updatedData, { new: true })

        if (!student) {
            return res.status(404).send("ID not found")
        }
        res.send(student)
    }
    catch (err) {
        return res.status(404).send("ID not found")
    }

}
// Delete Student
const studentDelete = async (req, res) => {
    const id = req.params.id;
    try {
        const student = await Student.findByIdAndDelete(id);
        if (!student) {
            return res.status(404).send("ID not found")
        }
        res.send(student);
    } catch (err) {
        return res.status(404).send("ID not found")
    }

}

//Refactoring the Routes
router.route('/')
    .get(studentList)
    .post(newStudent);

router.route('/:id')
    .get(studentDetail)
    .put(studentUpdate)
    .delete(studentDelete);

module.exports = router;