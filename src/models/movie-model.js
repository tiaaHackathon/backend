const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
    {
        mname: {
            type: String,
            required: true
        },
        mimage: {
            type: String,

        },
        mcast: {
            type: [],
            required: true
        },
        mcrew: {
            type: [],
            required: true
        },
        moviegenre: {
            type: [],
            required: true
        },
        storyline: {
            type: String,
            required: true
        },
        runningtime: {
            type: String,
            required: true
        },
        awards: {
            type: []
        },
        budget: {
            type: String,
            required: true
        },
        boxofficecollection: {
            type: String,
            required: true
        },
        releasedate: {
            type: Date,
            required: true
        },
        rating: {
            type: Number
        }

    }
);

const Movie = mongoose.model('Movie', movieSchema);
Movie.createIndexes();
module.exports = Movie;