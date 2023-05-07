const express = require('express');
const reviewRouter = express.Router();
const Review = require('../../models/review-model');

const controllers = require('../../controllers/reviewControllers');

reviewRouter.get('/fetchreview/:mid', controllers.getReviews);
reviewRouter.post('/addreview/:uid/:mid', controllers.addReview);
reviewRouter.get('/getcomments/:uid/:mid', controllers.getComments);
reviewRouter.post('/addcomment/:uid/:mid', controllers.addComment);
reviewRouter.post('/likereview/:uid/:rid', controllers.likeReview);
reviewRouter.post('/dislikereview/:uid/:rid', controllers.dislikeReview);
module.exports = reviewRouter;