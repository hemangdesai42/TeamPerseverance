const express = require('express');
const router = express.Router();
const { User } = require('../db/models')
const { csrfProtection, asyncHandler } = require('./utils');


router.get('/', (req, res) => {
    let user;
    if ( res.locals.authenticated) {
        user = res.locals.user
    }
    console.log(user);

    res.render('home', {user, title: "Homepage"})
})

module.exports = router
