const express = require('express');
const router = express.Router();
const { User } = require('../db/models')
const { csrfProtection, asyncHandler } = require('./utils');
const { validationResult } = require('express-validator');
const { userValidator } = require('./validation');
const bcrypt = require('bcryptjs');

/* GET users listing. */
router.get('/sign-up', csrfProtection, function(req, res, next) {
  const user = User.build();
  res.render('registration', { 
    title,
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
    res.redirect('/home');
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('registration', { 
      title: 'Register',
      user,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}));

module.exports = router;
