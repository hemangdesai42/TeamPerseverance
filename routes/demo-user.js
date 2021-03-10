const express = require('express');
const router = express.Router();
const { User } = require('../db/models')
const { csrfProtection, asyncHandler } = require('./utils');
const { logInUser } = require('../auth');

router.get('/', asyncHandler(async(req, res, next) => {

    let user = await User.findOne({ where: { userName: "DemoUser" } });
    // console.log(user)
    logInUser(req, res, user)
    return res.redirect('/home');
}));


module.exports = router;