const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const loginRoutes = require('../src/routers/user/user-router');
var cors = require('cors')
const cookieParser = require('cookie-parser');
const { compareSync } = require("bcrypt");



dotenv.config({ path: __dirname + "/../config.env" })

const app = express();




const port = process.env.PORT;
const url = process.env.DATABASE;
const secretKey = process.env.SECRET_KEY;

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routers = require('./routers/index');

mongoose.connect(process.env.DB).then((result) => {
    app.listen(port);
    console.log("DB started and server hosted on port " + port);
    console.log(`http://localhost:${port}/`);
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