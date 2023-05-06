const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    comment: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    }
});

const reviewSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    mid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movies',
        required: true
    },
    review: {
        type: String
    },
    comment: {
        type: [commentSchema],
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    }
});
const Comments = mongoose.model('Comments', commentSchema);
Comments.createIndexes();

const Review = mongoose.model('Review', reviewSchema);
Review.createIndexes();
module.exports = { Review, Comments };