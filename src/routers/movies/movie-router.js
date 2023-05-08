const express = require('express');
const movieRouter = express.Router();
const Movie = require('../../models/movie-model');

const controllers = require('../../controllers/movieControllers');



movieRouter.get('/default', controllers.get_movie_list_default);
movieRouter.get('/search/:query', controllers.get_movie_list_search);
movieRouter.get('/getMovie/:id', controllers.get_movie_info);

movieRouter.post('/q', controllers.query_filter);
movieRouter.get('/genre/:genre', controllers.get_genre);
module.exports = movieRouter;