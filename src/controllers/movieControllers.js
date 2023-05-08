const Movie = require('../models/movie-model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { TopologyDescription } = require('mongodb');
dotenv.config({
    path: '/../config.env'
});

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { movie: '' };
    if (err.message === 'No Movie for this Genre') {
        errors.movie = "No Movie for this Genre";
    }
    return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: maxAge
    });
}

module.exports.get_movie_list_search = async (req, res) => {
    const query = req.params.query;
    try {
        const movies = await Movie.find({
            // $or: [
            "original_title": { $regex: query, $options: 'i' }
            //{ "cast": { $contains: { $regex: query, $options: 'i' } } },
            //    { "crew": { $contains: { $regex: query, $options: 'i' } } }
            //]
        });
        const response = {
            'status': 200,
            'message': 'success',
            'body': movies
        }
        console.log(movies);
        res.status(200).json({ response });
    }
    catch (err) {
        res.status(500).json("Internal Server Error");
    }
};

module.exports.get_movie_list_default = async (req, res) => {

    try {
        const movies = await Movie.find()//.sort({ release_date: -1 }).limit(5);
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


module.exports.get_movie_info = async (req, res) => {
    const id = req.params.id;

    // console.log(req.params)

    // console.log("id" + id);
    try {
        Movie.findById(id).then((result) => {
            res.status(201).json(result);
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports.query_filter = async (req, res) => {
    // const popularity = 1;
    // const release = 0-0;
    // const id = req.params.id;

    const { genre, releaseLower, releaseUpper } = req.body;

    let { popularity } = req.query;

    if (!popularity) {
        popularity = -1;
    }

    const startDate = new Date(releaseLower);
    const endDate = new Date(releaseUpper);

    try {
        Movie.find({
            genre: { $in: genre },
            release_date: { $gte: startDate, $lt: endDate }
        }).sort({ popularity: popularity }).then((result) => {
            res.status(200).json({
                status: 200,
                message: 'success',
                body: result
            })
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports.get_genre = async (req, res) => {
    const genre = req.params.genre;
    try {
        const movie = await Movie.find({ genre: genre }).sort({ rating: -1 }).limit(5);
        if (!movie) {
            throw Error("No Movie for this Genre");
        }
        res.status(200).json(movie);
    }
    catch (err) {
        const error = handleErrors(err);
        res.status(400).json(error);
    }
};