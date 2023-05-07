const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.pre('save', async function (next) {
    next();
});

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect Password!!');
    }
    throw Error('Email Not Registered!!');
};

const User = mongoose.model('User', userSchema);
User.createIndexes();
module.exports = User;