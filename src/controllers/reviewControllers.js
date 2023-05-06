const { Review, Comments } = require('../models/review-model');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
//const User = require('../models/user-model');
dotenv.config({
    path: '/../config.env'
});

module.exports.addReview = async (req, res, next) => {
    const mid = req.params.mid;
    const rev = req.body.review;
    console.log(mid, rev);
    const uid = req.params.uid;
    try {
        const review = await Review.create({
            uid: uid,
            mid: mid,
            review: rev
        });
        res.status(200).json(review);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "Interal Server Error" });
    }

};

module.exports.getReviews = async (req, res) => {
    const uid = req.params.uid;
    const mid = req.params.mid;

    try {
        Review.find({ uid: uid, mid: mid }).then((result) => {
            res.status(200).json(result);
        })
    } catch (err) {

    }
}
module.exports.getComments = async (req, res) => {
    const uid = req.params.uid;
    const mid = req.params.mid;

    try {
        const rev = await Review.findOne({ uid: uid, mid: mid });
        const comments = rev.comment;
        //console.log(comments);
        res.status(200).json(comments);
    } catch (err) {

    }
};

module.exports.addComment = async (req, res) => {
    const uid = req.params.uid;
    const mid = req.params.mid;
    const comments = req.body.comments;
    try {
        const review = await Review.findOne({ uid: uid, mid: mid });
        const comm = await Comments.create({
            uid: uid,
            comment: comments
        });
        review.comment.push(comm);
        review.save();
        res.status(200).json(review);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "Interal Server Error" });
    }
};  