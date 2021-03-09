const { check } = require('express-validator');
const { User } = require('../db/models')


const userValidator = [
    check('name')
        .exists({ checkFalsy: true})
        .withMessage('Please provide a value for Name')
        .isLength({ max: 50})
        .withMessage('Name must not be more than 50 characters long'),
    check('userName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for User Name')
        .isLength({ max: 50 })
        .withMessage('User Name must not be more than 50 characters long'),
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Email')
        .isLength({ max: 255 })
        .withMessage('Email Address must not be more than 255 characters long')
        .isEmail()
        .withMessage('Email Address is not a valid email')
        .custom((value) => {
          return User.findOne({ where: { email: value } })
            .then((user) => {
              if (user) {
                return Promise.reject('The provided Email Address is already in use by another account');
              }
            });
        }),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Password'),
        // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
        // .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
    check('confirmPassword')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Confirm Password')
        .custom((value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Confirm Password does not match Password');
          }
          return true;
        }),
]

const loginValidator = [
    check('userName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value User Name'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Password'),
];

module.exports = {
    userValidator,
    loginValidator
}
