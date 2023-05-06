const express = require('express');
const movieRouter = express.Router();

const controllers = require('../../controllers/movieControllers');


movieRouter.get('/', async (req, res) => {
    res.send("movie");
});

movieRouter.get('/default', controllers.get_movie_list_default);

module.exports = movieRouter;