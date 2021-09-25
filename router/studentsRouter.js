const express = require('express');
const db = require('../db');

const router = express.Router();

//Named Function
// Student Data
const studentList = (req, res) => {
    db.getBdStudents()
        .then(students => {
            res.send(students);
        })
}
//New Student
const newStudent = (req, res) => {
    const student = req.body;
    db.getBdStudents()
        .then(students => {
            students.push(student);
            db.insertDbStudents(students)
                .then(data => {
                    res.send(student);
                })
        })
}
//Student Detail
const studentDetail = (req, res) => {
    const id = parseInt(req.params.id);
    db.getBdStudents()
        .then(students => {
            const student = students.find(item => {
                return item.id === id;
            });
            if (!student) {
                res.status(404).send("No student found!")
            } else {
                res.send(student);
            }
        })

}
//Update Student List
const studentUpdate = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    db.getBdStudents()
        .then(students => {
            const student = students.find(item => {
                return item.id === id;
            });
            if (!student) {
                res.status(404).send("No student found!")
            } else {
                const arrayIndex = students.findIndex(stu => stu.id === id);
                students[arrayIndex] = updatedData;
                db.insertDbStudents(students)
                    .then(mesg => {
                        res.send(updatedData);
                    })
            }
        })

}
// Delete Student
const studentDelete = (req, res) => {
    const id = parseInt(req.params.id);
    db.getBdStudents()
        .then(students => {
            const student = students.find(item => {
                return item.id === id;
            });
            if (!student) {
                res.status(404).send("No student found!")
            } else {
                const updatedStudents = students.filter(stu => stu.id !== id);
                db.insertDbStudents(updatedStudents)
                    .then(msg => {
                        res.send(student)
                    })
            }
        })
}

//Refactoring the Routes
router.route('/')
    .get(studentList)
    .post(newStudent);

router.route('/:id')
    .get(studentDetail)
    .put(studentUpdate)
    .delete(studentDelete);

// app.get('/api/students', studentList);

// app.post('/api/students', newStudent);

// app.get('/api/students/:id', studentDetail);

// app.put('/api/students/:id', studentUpdate);

// app.delete('/api/students/:id', studentDelete);

module.exports = router;