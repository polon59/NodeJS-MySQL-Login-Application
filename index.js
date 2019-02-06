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
    const schema = {
        name: Joi.string().min(3).required()
    };

    const validationResult = Joi.validate(req.body, schema);
    console.log(validationResult);

    if (validationResult.error) {
        res.status(400).send(validationResult.error.details[0].message);
    }
    else{
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