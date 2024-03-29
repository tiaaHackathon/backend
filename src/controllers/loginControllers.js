const User = require('../models/user-model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config({
    path: '/../config.env'
});

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { name: '', username: '', phone: '', email: '', password: '' };

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

    if (err.message === "Phone must be only 10 digits") {
        err.phone = "Phone must be only 10 digits";
    }

    //incorrect email
    if (err.message === 'Email Not Registered!!') {
        errors.email = 'Email is Not Registered!!';
    }
    //incorrecct password
    if (err.message === 'Incorrect Password!!') {
        errors.password = 'Incorrect Password!!';
    }
    if (err.message === 'User not found') {
        errors.name = 'User not found';
    }
    return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: maxAge
    });
}
module.exports.signup_post = async (req, res) => {
    //username remove

    const { name, email, phone, password } = req.body;
    try {
        if (phone.length != 10) {
            throw Error('Phone must be only 10 digits');
        }
        const salt = await bcrypt.genSalt();
        const hpassword = await bcrypt.hash(password, salt);
        const user = await User.create({ name: name, email: email, phone: phone, password: hpassword });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id, jwt: token });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.signin_post = async (req, res) => {
    const { email, password, isAdmin } = req.body;

    try {
        var Admin = false;

        if (isAdmin) {
            Admin = isAdmin;
        }
        console.log("Admin " + Admin);
        const user = await User.login(email, password, Admin);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        console.log("Login successful");

        res.status(200).json({ user: user._id, message: "Login successful", jwt: token });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}
module.exports.getUser = async (req, res) => {
    const uid = req.params.uid;
    try {
        const user = await User.findById(uid);
        if (!user) {
            throw Error("User not found");
        }
        res.status(200).json({ user: user });
    }
    catch (err) {
        const error = handleErrors(err);
        res.status(500).json({ error });
    }
};