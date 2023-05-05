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

userSchema.pre('save', async function (next) {
    next();
});

userSchema.statics.login = async function (username, password) {
    const user = await this.findOne({ username });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect Password!!');
    }
    throw Error('UserName Not Registered!!');
};

const User = mongoose.model('User', userSchema);
User.createIndexes();
module.exports = User;