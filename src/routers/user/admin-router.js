const express = require('express');
const adminRouter = express.Router();

const controllers = require('../../controllers/adminControllers');


adminRouter.get('/', async (req, res) => {
    res.send("admin");
});

adminRouter.post('/addmovie', controllers.admin_add_movie);

// adminRouter.get('/populate', controllers.populateTheDB);

module.exports = adminRouter;