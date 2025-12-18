require('dotenv').config()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
                name: req.body.name || undefined
            })
            user.save()
                .then(() => res.status(200).json('Successfully , user created'))
                .catch(error => res.status(400).json({ error: error }))
        })
        .catch(error => res.status(500).json({ error: error }))
}

exports.login = (req, res, next) => {
    console.log('...login')
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user != null) {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (valid) {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    process.env.JWT_SECRET,
                                    { expiresIn: '72h' }
                                )
                            })
                        } else {
                            res.status(400).json({ message: 'Informations incorrectes' })
                        }
                    })
                    .catch(() => res.status(400).json({ message: 'Informations incorrectes' }))
            } else {
                res.status(404).json({ message: 'Informations incorrectes' })
            }
        })
        .catch((error) => {
            console.log('error: ', error)
            res.status(500).json({ error: error })
        })
}