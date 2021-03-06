const express = require('express')
const router = express.Router()
const {body, validationResult} = require('express-validator')
const userController = require('../controllers/userController')
const emailController = require('../controllers/emailController')
const authHandler = require('../middleware/authMiddleware')

router.post('/register', body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min: 5}).withMessage('The minimum password length is 5 characters'),
    userController.register)
router.post('/login', body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min: 5}).withMessage('The minimum password length is 5 characters'), userController.login)
router.get('/isAuth', authHandler, userController.isAuth)
router.get('/getUsers', authHandler, userController.getUsers)

router.post('/sendEmail', authHandler, emailController.sendEmail)
router.get('/getEmails', authHandler, emailController.getEmails)

module.exports = router




