const express = require('express');
const app = express();

app.get("/", (req, res) =>{
    res.send("hello");
});

app.get("/api/courses", (req, res) =>{
    res.send([1,2,3]);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {console.log(`listening on port ${port}`)});