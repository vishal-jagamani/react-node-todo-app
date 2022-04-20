const db = require('./config/dbconfig');

const todo = require('./services/todo');
const dbUtil = require('./services/dbUtil');
const login = require('./services/login');

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors())
app.use(express.json());

//login page
app.post("/login", (req, res) =>  {
    login.getDetails(req.body.email, req.body.password)
        .then(data => 
            {
                res.set("Access-Control-Allow-Methods", "*");
                if(data == true) {
                    res.send(true);
                } else {
                    res.send(false);
                }
            })
        .catch(err => res.send(err))
});

//registration 
app.post("/register", (req, res) => {
    login.register(req.body.name, req.body.email, req.body.password1)
        .then(data => {
                res.set("Access-Control-Allow-Methods", "*");
                res.send(data)
        })
        .catch(err => {
            res.send(err)
        })
})

//home page
app.get("/getdata", (req, res) => {
    todo.getdata()
        .then(data => {
            res.send(data);
            console.log(data)
        })
        .catch(err => res.send(err))
    console.log(todo.getdata());
});

//adding new task 
app.post("/addTodoList", (req, res) => {
    todo.addTodoList(req.body.task, req.body.date)
        .then(data => res.send(data))
        .catch(err => res.send(err))
});

//updating task
app.patch("/updateData", (req, res) => {
    todo.editData(req.body.id, req.body.task, req.body.date)
        .then((result) => {
            res.set("Access-Control-Allow-Methods", "*");
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

//deleting task
app.delete("/deleteTask", (req, res) => {
    todo.deleteTask(req.body.id)
        .then(data => res.send(data))
        .catch(err => res.send(err))
});

//listening to port
app.listen(4000, () => {
    console.log("Server running on port 4000");
});


