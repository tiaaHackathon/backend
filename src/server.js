const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const { compareSync } = require("bcrypt");

dotenv.config({ path: __dirname + "/../config.env" })
const loginRoutes = require('../src/routers/user/user-router');
const app = express();

const port = process.env.PORT;
const url = process.env.DATABASE;
const secretKey = process.env.SECRET_KEY;

app.use(express.json());


const routers = require('./routers/index');

mongoose.connect(process.env.DB).then((result) => {
    app.listen(port);
    console.log("DB started and server hosted on port " + port);
    console.log("http://localhost:9000/");
}).catch((err) => {
    console.log('ERROR');
    console.log(err);
});

app.use(routers);


app.get('*', (req, res) => {
    res.status(400).json({
        'status': 404,
        'message': 'invalid request'
    });

});