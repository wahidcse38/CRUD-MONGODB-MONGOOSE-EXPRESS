//EXPRESS
const express = require('express');
const app = express();
const studentRouter = require('./router/studentsRouter');

app.use(express.json());
app.use('/api/students', studentRouter);

app.get('/', (req, res) => {
    res.send("Hello World!");
})



const port = 3000;

app.listen(port, () => {
    console.log("Listening on port 3000.....")
})

//console.log(app)