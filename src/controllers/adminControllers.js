const Movie = require('../models/movie-model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

const axios = require('axios')


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
    const { adult: adult,
        backdrop_path,
        genre,
        genre_ids,
        keywords,
        original_language,
        original_title,
        overview,
        popularity,
        poster_path,
        release_date,
        video,
        vote_average,
        video_count } = req.body;
    try {
        if (popularity < 0) {
            throw Error("Rating can't be negative");
        }
        if (release_date > new Date().getDate()) {
            throw Error("Date must be older than today");
        }
        const movie =
            await Movie.create({
                adult: adult,
                backdrop_path: backdrop_path,
                genre: genre,
                genre_ids: genre_ids,
                keywords: keywords,
                original_language: original_language,
                original_title: original_title,
                overview: overview,
                popularity: popularity,
                poster_path: poster_path,
                release_date: release_date,
                video: video,
                vote_average: vote_average,
                video_ount: video_count
            });
        console.log("Movie Inserterd");
        res.status(201).json({ movie: movie._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }

};

