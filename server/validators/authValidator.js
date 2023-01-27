const { body, check } = require('express-validator')


module.exports.RegisterValidator = RegisterValidator = [
    body("email", "Email is not valid").normalizeEmail().isEmail(),
    body("password", "Password is not valid").not().isEmpty()
]

module.exports.LoginValidator = LoginValidator = [
    body("email", "Email is not valid").not().isEmpty().normalizeEmail().isEmail(),
    body("password", "Password is not valid. min is 6 char").not().isEmpty()
]

