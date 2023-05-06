const Movie = require('../models/movie-model');
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
        errors.email = "UserName already registered";
    }

    //validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    //incorrect email
    if (err.message === 'UserName Not Registered!!') {
        errors.email = 'UserName is Not Registered!!';
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


module.exports.get_movie_list_default = async (req, res) => {

    try {
        const movies = await Movie.find();

        const response = {
            'status': 200,
            'message': 'success',
            'body': movies
        }


        res.status(201).json(response);
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}
