const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    mid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    reply: {
        type: []
    },
    comment: {
        type: String,
        maxLength: 3000,
        required: true
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

const Review = mongoose.model('Review', reviewSchema);
Review.createIndexes();
module.exports = Review;