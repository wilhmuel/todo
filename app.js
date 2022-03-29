const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

//Middleware
app.use(bodyParser.json());
app.use(cors());

//Routes
const tasksRoute = require('./routes/tasks');
app.use('/tasks', tasksRoute);
app.get('/', (req, res) => {
    res.send('we are home');
});


app.listen(3000);

//DB Connect
mongoose.connect(process.env.DB_CONNECTION, () =>
    console.log('connected to db')
);