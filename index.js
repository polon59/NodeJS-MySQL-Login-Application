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
    res.send("main page");
});


app.get("/api/courses", (req, res) =>{
    res.send(courses);
});


app.get("/api/courses/:id", (req, res) =>{
    const course = findCourseWithGivenID(req.params.id);
    if (!course){
        res.status(404).send("This course does not exist.");
    }else{
        res.send(course);
    } 
});


app.post('/api/courses', (req, res) =>{
    const {error} = validateCourse(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
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


app.put('/api/courses/:id', (req, res) =>{
   const course = findCourseWithGivenID(req.params.id);

    if (!course){
        res.status(404).send("This course does not exist.");
    }
    else{
        const {error} = validateCourse(req.body);

        if (error) {
            res.status(400).send(error.details[0].message);
        }
        else{
            course.name = req.body.name;
            res.send(course);
        }
    } 
});


app.delete('/api/courses/:id', (req, res) => {
    const course = findCourseWithGivenID(req.params.id);
    if (!course){
        res.status(404).send("This course does not exist.");
    }
    else{
        const indexOfCourse = courses.indexOf(course);
        courses.splice(indexOfCourse,1);
        res.send(course);
    }
});




function findCourseWithGivenID(courseID) {
    return courses.find(course => course.id === parseInt(courseID));
}

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}



const port = process.env.PORT || 8000;
app.listen(port, () => {console.log(`listening on port ${port}`)});