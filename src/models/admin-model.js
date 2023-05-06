const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    }
});

adminSchema.pre('save', async function (next) {
    next();
});

adminSchema.statics.login = async function (username, password) {
    const admin = await this.findOne({ email });
    if (admin) {
        const auth = await bcrypt.compare(password, admin.password);
        if (auth) {
            return admin;
        }
        throw Error('Incorrect Password!!');
    }
    throw Error('Admin Not Registered!!');
};

const Admin = mongoose.model('Admin', adminSchema);
Admin.createIndexes();
module.exports = Admin;