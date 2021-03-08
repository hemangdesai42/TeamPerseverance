const express = require('express');
const router = express.Router();
const { User } = require('../db/models')
const { csrfProtection, asyncHandler } = require('./utils');
const { validationResult } = require('express-validator');
const { userValidator, loginValidator } = require('./validation');
const bcrypt = require('bcryptjs');
const { logInUser, logOutUser } = require('../auth');


/* GET users listing. */
router.get('/sign-up', csrfProtection, function(req, res, next) {
  const user = User.build();
  res.render('sign-up', {
    title: 'Registration',
    user,
    csrfToken: req.csrfToken(),
  });
});

router.post('/sign-up', userValidator, csrfProtection, asyncHandler(async(req, res, next) => {
  const { name, userName, email, password, bio } = req.body;
  //Make sure the validations are set up in the validation.js . (solo)
  const user = await User.build({
    name,
    userName,
    email,
    bio
  });

  const validationErrors = validationResult(req);
  //have to set up try/catch here
  if (validationErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.hashPassword = hashedPassword;
    await user.save();
    //adjust route accordingly
    //login user
    logInUser(req, res, user);
    res.redirect('/home');
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('sign-up', {
      title: 'Register',
      user,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}));

router.get('/login', csrfProtection, asyncHandler(async (req, res, next) => {
  res.render('login', { title: 'Login', csrfToken: req.csrfToken() });
}));

router.post('/login', csrfProtection, loginValidator, asyncHandler(async (req, res, next) => {
  const { userName, password } = req.body;
  const validatorErrors = validationResult(req);
  let errors = [];
  if (validatorErrors.isEmpty()) {
    const user = await User.findOne({where: {userName}});
    // if (user && await bcrypt.compare(password, user.hashPassword.toString()) {
    //   // successful login
    // } else {
    //   // user doesnt exist OR password mismatch
    // }
    if (user !== null) {
      const passwordMatch = await bcrypt.compare(password, user.hashPassword.toString());
      if (passwordMatch) {
        logInUser(req, res, user)
        // login user
        console.log('Logged in')
        // redirect to home page (remember to return)
      } else {
        // password doesn't match
        errors.push('Login failed for the provided User Name and Password');
      }
    } else {
      // user doesn't exist in db
      errors.push('Login failed for the provided User Name and Password');
    }
  } else {
    // validator error
    errors = validatorErrors.array().map(error => error.msg);
  }
  res.render('login', { title: 'Login', errors, csrfToken: req.csrfToken() });
}));





//DO DEMO USER

module.exports = router;
