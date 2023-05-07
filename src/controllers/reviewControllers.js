const { Review, Comments } = require('../models/review-model');
const User = require('../models/user-model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
//const User = require('../models/user-model');
dotenv.config({
    path: '/../config.env'
});
//add a review
module.exports.addReview = async (req, res, next) => {
    const mid = req.params.mid;
    const rev = req.body.review;
    console.log(mid, rev);
    const uid = req.params.uid;
    try {
        const user = await User.findById({ _id: uid });
        const username = user.name;
        const review = await Review.create({
            uid: uid,
            username: username,
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
//get reviews by movie
module.exports.getReviews = async (req, res) => {
    //    const uid = req.params.uid;
    const mid = req.params.mid;

    try {
        Review.find({ mid: mid }).then((result) => {
            res.status(200).json(result);
        })
    } catch (err) {

    }
};

//get all comments on a particular review
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

//add comment to a review
module.exports.addComment = async (req, res) => {
    const uid = req.params.uid;
    const mid = req.params.mid;
    const comments = req.body.comments;
    try {
        const user = await User.findById({ _id: uid });
        const review = await Review.findOne({ uid: uid, mid: mid });
        const comm = await Comments.create({
            uid: uid,
            username: user.name,
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

//like a review
module.exports.likeReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.rid);
        if (!review) {
            return res.status(404).json({ error: "Review Not Found" });
        }
        const uid = req.params.uid;
        if (review.likes.includes(uid)) {
            review.likes = review.likes.filter(id => id !== uid);
        } else {
            review.likes.push(uid);
            if (review.dislikes.includes(uid)) {
                review.dislikes = review.dislikes.filter(id => id !== uid);
            }
        }
        await review.save();
        res.json(review);
    }
    catch (err) {
        res.status(500).send('Server error');
    }
};

//dislike a review
module.exports.dislikeReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.rid);
        if (!review) return res.status(404).json({ msg: 'Review not found' });
        const uid = req.body.uid;
        if (review.dislikes.includes(uid)) {
            review.dislikes = review.dislikes.filter(id => id !== uid);
        } else {
            review.dislikes.push(uid);
            if (review.likes.includes(uid)) {
                review.likes = review.likes.filter(id => id !== uid);
            }
        }
        await review.save();
        res.json(review);
    } catch (err) {
        res.status(500).send('Server error');
    }
};





