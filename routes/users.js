const {Router} = require('express')
const { Registration, Login } = require('../controllers/AuthContoller')
const { RegistrationValidator, LoginValidator } = require('../validators/AuthValidator')


const Authrouter = Router()

Authrouter.post("/registration", RegistrationValidator, Registration)
Authrouter.post("/login", LoginValidator, Login)

module.exports = Authrouter