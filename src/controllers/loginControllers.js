const User = require('../models/user-model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config({
    path: '/../config.env'
});

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { name: '', username: '', email: '', password: '' };

    // duplicate error code
    if (err.code === 11000) {
        errors.email = "Email already registered";
    }

    //validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    //incorrect email
    if (err.message === 'Email Not Registered!!') {
        errors.email = 'Email is Not Registered!!';
    }
    //incorrecct password
    if (err.message === 'Incorrect Password!!') {
        errors.password = 'Incorrect Password!!';
    }
    return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: maxAge
    });
}

module.exports.signin_get = (req, res) => {
    res.render('signin')
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.signup_post = async (req, res) => {
    //username remove

    const { name, email, phone, username, password } = req.body;
    try {
        const salt = await bcrypt.genSalt();
        const hpassword = await bcrypt.hash(password, salt);
        const user = await User.create({ name: name, email: email, phone: phone, username: username, password: hpassword });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.signin_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log(email);
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        console.log("Login successful");
        res.status(200).json({ user: user._id, message: "Login successful" });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}