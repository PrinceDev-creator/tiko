require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        console.log('req.headers: ', req.headers)
        const token = req.headers.authorization.split(' ')[1]
        console.log('token: ', token)
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        req.auth = {
            userId: payload.userId
        }

        next()

    } catch (error) {
        res.status(401).json({ error: error })
    }

}