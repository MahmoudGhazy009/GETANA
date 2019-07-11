const bcrypt = require('bcrypt')
const Joi = require('joi')
const _ = require('lodash');
const debug = require("debug")("app:startup");
const express = require("express");
const router = express.Router();
const {
    User
} = require('../users/user.model')

router.post("/", async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) {
        console.log("error", error.details[0].message)
        res.status(404).send(error.details[0].message);
        return;
    }

    let user = await User.findOne({
        email: req.body.email
    });
    if (!user) {
        console.log('Invalid email or password')
        return res.status(400).send('Invalid email or password')
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
        console.log('Invalid email or password')
        return res.status(400).send('Invalid email or password')
    }
    try {
        const token = user.generateAuthToken();
        res.send(token)
        console.log('tokrn', token)
    } catch (ex) {
        //for (Field in ex.errors) console.log(ex.errors[Field].message);
        console.log("moongoose validation error", ex);
        res.send();
    }
});

function validate(req) {
    const schema = {
        email: Joi.string().required().email(),
        password: Joi.string()
            .min(8)
            .max(255)
            .required()
    };
    return Joi.validate(req, schema);
}

module.exports = router;