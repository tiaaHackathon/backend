const express = require('express');
const adminRouter = express.Router();

const controllers = require('../../controllers/loginControllers');


adminRouter.get('/', async (req, res) => {
    res.send("admins");
});

adminRouter.post('/signin,', controllers.signin_post);

adminRouter.post('/signup', controllers.signup_post);

module.exports = adminRouter;