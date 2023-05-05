const express = require('express');
const userRouter = express.Router();

const { signin_post, signup_post } = require('../../controllers/loginControllers');


userRouter.get('/', async (req, res) => {
    res.send("users");
});

userRouter.post('/signin,', signin_post);

userRouter.post('/signup', signup_post);

module.exports = userRouter;