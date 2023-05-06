const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
    {
        adult: {
            type: Boolean,
            // required: true
        },
        backgroundPosterURL: {
            type: String,
            // required: true
        },
        genre: {
            type: [],
            // required: true
        },

        originalLanguage: {
            type: String,
            // required: true,
            unique: true
        },
        originalTitle: {
            type: String,
            // required: true
        },
        overview: {
            type: String,
            // required: true
        },
        popularity: {
            type: Number
        },
        posterURL: {
            type: String,
            // required: true
        },
        releaseDate: {
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
        voteAverage: {
            type: Number,
            // required: true
        },
        voteCount: {
            type: Number,
            // required: true
        },
    }
);

const Movie = mongoose.model('Movie', movieSchema);
Movie.createIndexes();
module.exports = Movie;