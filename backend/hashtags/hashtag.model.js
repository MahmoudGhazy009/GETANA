const mongoose = require("mongoose");
const Joi = require("joi");

const hashtagSchema = new mongoose.Schema({
    name: String,
    timeline: [Object],
    analysis: [Object],
}, {
    versionKey: false,
    strict: false
});

const Hashtags = mongoose.model("Hashtags", hashtagSchema)

function validateTag(tag) {
    const tagSchema = {
        //name: Joi.string().min(3).required()
    };
    return Joi.validate(tag, tagSchema);
};


exports.hashtagSchema = hashtagSchema;
exports.Hashtags = Hashtags;
exports.validateTag = validateTag;