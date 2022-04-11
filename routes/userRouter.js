const express = require('express')
const router = express.Router()
const {body, validationResult} = require('express-validator')
const userController = require('../controllers/userController')
const emailController = require('../controllers/emailController')
const authHandler = require('../middleware/authMiddleware')

router.post('/register', body('email').isEmail(),
    body('password').isLength({min: 5}),
    userController.register)
router.post('/login', body('email').isEmail(),
    body('password').isLength({min: 5}), userController.login)
router.get('/isAuth', authHandler, userController.isAuth)

router.post('/sendEmail', authHandler, emailController.sendEmail)
router.get('/getEmails', authHandler, emailController.getEmails)
module.exports = router




