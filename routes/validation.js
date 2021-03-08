const { check } = require('express-validator');


const userValidator = [
    // check('name')
    //     .exists({ checkFalsy: true})
    //     .withMessage('Please provide a value for Name')
    //     .isLength({ max: 50})
    //     .withMessage('Name must not be more than 50 characters long'),
    // check('userName')
    //     .exists({ checkFalsy: true })
    //     .withMessage('Please provide a value for User Name')
    //     .isLength({ max: 50 })
    //     .withMessage('User Name must not be more than 50 characters long'),
]



module.exports = {
    userValidator
}
