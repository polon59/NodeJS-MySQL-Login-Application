const express = require('express');
const app = express();

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

const port = process.env.PORT || 8000;

app.listen(port, () => {console.log(`listening on port ${port}`)});