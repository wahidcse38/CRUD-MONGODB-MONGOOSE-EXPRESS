
const fs = require('fs');



const getBdStudents = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./db.json', 'utf-8', (err, data) => {
            const students = JSON.parse(data);
            resolve(students);
        })
    })
}

const insertDbStudents = (students) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./db.json', JSON.stringify(students), (err) => {
            resolve("Insert Student!")
        })
    })
}

module.exports.getBdStudents = getBdStudents;
module.exports.insertDbStudents = insertDbStudents;