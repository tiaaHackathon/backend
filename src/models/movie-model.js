const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
    {
        awards: {
            type: [],
            // required: true
        },
        backdrop_path: {
            type: String,
            // required: true
        },
        box_office_collection: {
            type: Number,
            // required: true
        },
        budget: {
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
            type: [String],
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
        rating: {
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
        }

    }
);

const Movie = mongoose.model('Movie', movieSchema);
Movie.createIndexes();
module.exports = Movie;