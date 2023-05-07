const { Router } = require('express');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('../../swagger_output.json');

const userRouter = require('./user/user-router');
const adminRouter = require('./user/admin-router');
const movieRouter = require('./movies/movie-router');
const reviewRouter = require('./reviews/review-router');
const router = Router();

router.use('/users', userRouter);
router.use('/admin', adminRouter);
router.use('/movies', movieRouter);
router.use('/reviews', reviewRouter);

router.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;