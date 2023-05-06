const { Router } = require('express');

const userRouter = require('./user/user-router');
const adminRouter = require('./user/admin-router');
const movieRouter = require('./movies/movie-router');
const reviewRouter = require('./reviews/review-router');
const router = Router();

router.use('/users', userRouter);
router.use('/admin', adminRouter);
router.use('/movies', movieRouter);
router.use('/reviews', reviewRouter);

module.exports = router;