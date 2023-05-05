const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    phone: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true,
        unique: true
    }
});


const User = mongoose.model('User', userSchema);
User.createIndexes();
module.exports = User;