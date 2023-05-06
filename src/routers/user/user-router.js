const express = require('express');
const userRouter = express.Router();

const controllers = require('../../controllers/loginControllers');


userRouter.get('/', async (req, res) => {
    res.send("users");
});

userRouter.post('/signin', controllers.signin_post);

userRouter.post('/signup', controllers.signup_post);

module.exports = userRouter;