const express = require('express');

const mongoose = require('mongoose');
const signupRoute = require('./routes/auth');
const taskRoute = require('./routes/task')

const MONGODB_URI = `mongodb+srv://himanshu:RNKTyKW2kQNJnxq2@cluster0.q1sgt3q.mongodb.net/ToDoList`;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(signupRoute);
app.use(taskRoute);

// app.use(auth);

app.get("/index", (req, res, next) => {
  res.status(201).json({
    message: "called index",
  });
});


app.get('/', (req, res, next) => {
    res.status(201).json({
      message: "called himanshu"
    });
})

// const userroutes = require('');

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message });
});

mongoose
  .connect(
    "mongodb+srv://himanshu:RNKTyKW2kQNJnxq2@cluster0.q1sgt3q.mongodb.net/ToDoList"
  )
  .then((result) => {
    app.listen(process.env.PORT || 8080);
  })
  .catch((err) => console.log(err));
