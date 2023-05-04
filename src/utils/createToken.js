const jwt = module.require("jsonwebtoken");

const maxAge = 30 * 24 * 60 * 60;

module.exports.createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: maxAge,
    });
};