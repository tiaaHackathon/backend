const express = require('express');
const adminRouter = express.Router();
const { requireAuth, checkUser } = require('../../utils/createToken');
const controllers = require('../../controllers/adminControllers');


adminRouter.get('/', async (req, res) => {
    res.send("admin");
});

adminRouter.put('/updater', controllers.photo_editor);

adminRouter.post('/addmovie', requireAuth, controllers.admin_add_movie);

module.exports = adminRouter;