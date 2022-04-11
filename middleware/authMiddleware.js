const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(403).json({message: 'The user is not logged in'})
    }
    let decoded
    try {
        decoded = jwt.verify(token, process.env.SECRET_KEY || 'itransition')
        req.user = decoded
        return next()
    } catch (e) {
        return res.status(403).json({message: 'The user is not logged in'})
    }
}