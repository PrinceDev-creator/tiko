const PassInfos = require('../models/passInfos')
const Event = require('../models/event')
const mongoose = require('mongoose')

exports.createTypePass = (req, res, next) => {
    console.log('id: ', req.params.id.trim(), '/n userId: ', req.auth.userId)
    Event.findById(req.params.id.trim())
        .then(event => {
            if (event == null) {
                res.status(404).json({ message: 'Vérifier les informations' })
            } else {
                if (event.creatorId.toString() != req.auth.userId) {
                    res.status(401).json({ message: 'Problème d\'authentification' })
                } else {
                    const passInfos = new PassInfos({
                        ...req.body,
                        eventId: event._id
                    })
                    passInfos.save()
                        .then(() => res.status(200).json({ message: 'Informations sur les types de pass enrégistrées avec succès' }))
                        .catch(error => res.status(500).json({ error: error }))
                }
            }
        })
        .catch(error => { res.status(400).json({ message: 'Vérifier les informations: ', error }) })
}
