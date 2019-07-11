const debug = require("debug")("app:startup");

const mongoose = require("mongoose");

const twitterUserSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
        unique: true
    }
}, {
    versionKey: false,
    strict: false
});
const TwitterUser = mongoose.model("TwitterUser", twitterUserSchema)

function validateUser(user) {
    const UserSchema = {
        //name: Joi.string().min(3).required()
    };
    return Joi.validate(user, UserSchema);
};

exports.twitterUserSchema = twitterUserSchema;
exports.validateUser = validateUser;
exports.TwitterUser = TwitterUser;