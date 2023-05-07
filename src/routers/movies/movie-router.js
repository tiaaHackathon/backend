const express = require('express');
const movieRouter = express.Router();
const Movie = require('../../models/movie-model');

const controllers = require('../../controllers/movieControllers');



movieRouter.get('/default', controllers.get_movie_list_default);
movieRouter.get('/search/:query', controllers.get_movie_list_search);
movieRouter.get('/getMovie/:id', async (req, res) => {
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
});

module.exports = movieRouter;