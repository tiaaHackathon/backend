const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
    {

        adult: {
            type: Boolean,
            // required: true
        },
        backdrop_path: {
            type: String,
            // required: true
        },
        cast: {
            type: [],
            // required: true
        },
        crew: {

            type: [],
            // required: true
        },
        genre: {
            type: [],
            // required: true
        },
        genre_ids: {
            type: [],
            // required: true
        },
        keywords: {
            type: [],
            // required: true
        },
        original_language: {
            type: String,
            // required: true,
            // unique: true
        },
        original_title: {
            type: String,
            unique: true
            // required: true
        },
        overview: {
            type: String,
            // required: true
        },
        popularity: {
            type: Number
        },
        poster_path: {
            type: String,
            // required: true
        },
        release_date: {
            type: Date,
            // required: true
        },
        title: {
            type: String,
            // required: true
        },
        video: {
            type: Boolean,
            // required: true
        },
        vote_average: {
            type: Number,
            // required: true
        },
        vote_count: {
            type: Number,
            // required: true
        },
    }
);

const Movie = mongoose.model('Movie', movieSchema);
Movie.createIndexes();
module.exports = Movie;