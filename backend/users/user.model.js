const jwt = require('jsonwebtoken')
const config = require('config');
const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");

const {
    twitterUserSchema
} = require('../twitterusers/twitterusers.model')
const {
    hashtagSchema
} = require('../hashtags/hashtag.model')

userSchema =
    new mongoose.Schema({
        firstName: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 20
        },
        lastName: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 20
        },
        twitterUserName: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50
        },
        email: {
            type: String,
            required: true,
            unique: true,
            minlength: 5,
            maxlength: 255
        },
        date: {
            type: Date,
            default: Date.now
        },
        role: String,
        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 1024
        },
        tags: {
            type: [String],
            /*validate: {
                validator: function (v) {
                    return v.length > 0;
                },
                message: 'A course should have at least one tag'
            }*/
        },
        profiles: [{
            type: [String],
            /*validate: {
                isAsync: true,
                validator: function (v, callback) {
                    setTimeout(() => {
                        const result = v && v.length > 0;
                        callback(result);
                    }, 4000);
                },
                message: "gggggggggg"
            }*/
        }],



        /*
        tags: [{
            type: hashtagSchema
        }],

        profiles: [{
            type: hashtagSchema
        }],*/

        sex: {
            type: String,
            //required: true,
            enum: ["Male", "Female"]
        }
    });

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id,
        firstName: this.firstName,
        twitterUserName: this.twitterUserName,
        role: this.role
    }, config.get('jwtPrivateKey'))
    //console.log("from user schema", token, "dddddd", config.get('jwtPrivateKey'), this._id)
    return token;
}

const User = mongoose.model(
    "User", userSchema
);

function validateUser(user) {
    const UserSchema = {

        firstName: Joi.string()
            .min(3)
            .max(50)
            .required(),
        lastName: Joi.string()
            .min(3)
            .max(50)
            .required(),
        twitterUserName: Joi.string().min(3).max(50).required(),
        email: Joi.string().required().email(),
        password: Joi.string()
            .min(8)
            .max(255)
            .required(),
        sex: Joi.string()
            .min(3)
            .max(50)
            .required()
    };
    return Joi.validate(user, UserSchema);
}

exports.userSchema = userSchema;
exports.User = User;
exports.validateUser = validateUser;