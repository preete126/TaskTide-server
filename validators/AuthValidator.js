const {check} = require("express-validator")



module.exports.RegistrationValidator = [
    check("email", "Invalid email address").isEmail(),
    check("password", "Password must be at least 8 characters long").isLength({min: 8}),
    check("username", "Invalid username").notEmpty()
]

module.exports.LoginValidator = [
    check("email","invalid email address").isEmail(),
    check("password", "Password must be at least 8 characters long").isLength({min: 8})
]