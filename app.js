//EXPRESS
const express = require('express');
const app = express();
const studentRouter = require('./router/studentsRouter');

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/my-student-2')
    .then(() => console.log("Connected to mongodb"))
    .catch(err => console.log("connection failed"))

//Third party middleware
const morgan = require('morgan');

//Built-in Middleware (3)
app.use(express.json());


//Morgan
app.use(morgan('dev'));
app.use('/api/students', studentRouter);





//Midleware

app.use((req, res, next) => {
    console.log("Middleware 1!");
    next()
})

app.use((req, res, next) => {
    console.log("Middleware 2!");
    next();
})

app.get('/', (req, res, next) => {

    // res.send('hello from simple server :)')
    next();
})


app.get('/', (req, res) => {
    console.log("Get Middleware!")
    res.send("Hello World!");

})




const port = 3000;

app.listen(port, () => {
    console.log("Listening on port 3000.....")
})

