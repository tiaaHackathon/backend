const express = require('express');
const adminRouter = express.Router();
const { requireAuth, checkUser } = require('../../utils/createToken');
const controllers = require('../../controllers/loginControllers');


adminRouter.get('/', async (req, res) => {
    res.send("admin");
});

adminRouter.post('/signin', controllers.signin_post);

adminRouter.post('/signup', controllers.signup_post);

module.exports = adminRouter;