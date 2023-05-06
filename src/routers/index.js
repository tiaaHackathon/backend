const { Router } = require('express');

const userRouter = require('./user/user-router');
const adminRouter = require('./user/admin-router');
const movieRouter = require('./movies/movie-router');
const router = Router();

router.use('/users', userRouter);
router.use('/admin', adminRouter);
router.use('/movies', movieRouter);

module.exports = router;