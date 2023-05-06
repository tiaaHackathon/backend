const Movie = require('../models/movie-model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config({
    path: '/../config.env'
});

const handleErrors = (err) => {
    console.log(err.message, err.code);
    //mname, releasedate, rating
    const errors = { mname: '', releasedate: '', rating: '' };
    if (err.code === 11000) {
        errors.message = "Cannot Add Movie!! \n The Movie already exists";
    }

    if (err.message === "Rating can't be negative") {
        err.rating = "Rating can't be negative";
    }
    if (err.message === "Date must be older than today") {
        err.releasedate = "Date must be older than today";
    }
    return errors;
}

module.exports.admin_add_movie = async (req, res) => {
    const { adult, backgroundPosterURL, genre, originalLanguage, originalTitle, overview, popularity, posterURL, releaseDate, video, voteAverage, videoCount } = req.body;
    try {
        if (popularity < 0) {
            throw Error("Rating can't be negative");
        }
        if (releaseDate > new Date().getDate()) {
            throw Error("Date must be older than today");
        }
        const movie =
            await Movie.create({
                adult: adult,
                backgroundPosterURL: backgroundPosterURL,
                genre: genre,
                originalLanguage: originalLanguage,
                originalTitle: originalTitle,
                overview: overview,
                popularity: popularity,
                posterURL: posterURL,
                releaseDate: releaseDate,
                video: video,
                voteAverage: voteAverage,
                videoCount: videoCount
            });
        console.log("Movie Inserterd");
        res.status(201).json({ movie: movie._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }

};