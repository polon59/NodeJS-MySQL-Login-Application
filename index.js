const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name:"course1"},
    {id: 2, name:"course2"},
    {id: 3, name:"course3"},
    {id: 4, name:"course4"},
]

app.get("/", (req, res) =>{
    res.send("hello");
});

app.get("/api/courses", (req, res) =>{
    res.send(courses);
});

app.get("/api/courses/:id", (req, res) =>{
    const result = courses.find(c => c.id === parseInt(req.params.id));
    if (!result){
        res.status(404).send("This course does not exist.");
    }else{
        res.send(result);
    } 
});

app.post('/api/courses', (req, res) =>{
    if (req.body.length < 3 || !req.body.name) {
        res.status(400).send("name is reqiured and must be longer than 3 characters");
    }else{
        const course = {
            id: courses.length+1,
            name: req.body.name
        };
        courses.push(course);
        res.send(course);
    }
});




const port = process.env.PORT || 8000;

app.listen(port, () => {console.log(`listening on port ${port}`)});