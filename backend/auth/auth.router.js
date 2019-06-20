const express = require('express');
const controller = require('./auth.controller');
const router = express.Router();


router.route('/auth')
    .post(controller.login);

module.exports =  router;
