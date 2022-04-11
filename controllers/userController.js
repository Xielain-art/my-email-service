const bcrypt = require('bcrypt')
const {User} = require('../models/models')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email) => {
    return jwt.sign({id, email}, process.env.SECRET_KEY || 'itransition', {
        expiresIn: '1h'
    })
}

class UserController {
    async register(req, res) {
        const {email, password} = req.body
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return res.status(400).json({
                message: 'A user with this email already exists'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({email, password: hashedPassword})
        const token = generateJwt(user.id, email)
        return res.json({token})
    }

    async login(req, res) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            res.status(400).json({message: 'User does not exist'})
        }
        let comparedPassword = await bcrypt.compare(password, user.password)
        if (comparedPassword) {
            const token = generateJwt(user.id, user.email)
            return res.json({token})
        }
        return res.status(400).json({message: 'The entered password is incorrect'})
    }

    async isAuth(req, res) {
        const token = generateJwt(req.user.id, req.user.email)
        return res.json({token})
    }
}

module.exports = new UserController()
