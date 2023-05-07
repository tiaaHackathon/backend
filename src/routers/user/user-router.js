const express = require('express');
const userRouter = express.Router();
const { requireAuth, checkUser } = require('../../utils/createToken');
const controllers = require('../../controllers/loginControllers');


userRouter.get('/', async (req, res) => {
    res.send("users");
});

userRouter.post('/signin', controllers.signin_post);

userRouter.post('/signup', controllers.signup_post);

userRouter.get('/logout'.controllers.logout);

module.exports = userRouter;