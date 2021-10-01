const { Schema, model } = require('mongoose');

const studentSchema = Schema({
    name: { type: String, required: true },
    age: {
        type: Number, validate: {
            validator: (value) => value > 0,
            message: "age is invalid!"
        }
    },
    hobbies: {
        type: Array,
        of: String,
        validate: {
            validator: (value) => value.length > 0,
            message: "At least one hobby!"
        }
    }
})

const Student = model('Student', studentSchema)
exports.Student = Student;