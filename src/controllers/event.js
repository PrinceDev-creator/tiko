// controllers/eventController.js (version améliorée)
const Event = require('../models/event');

exports.createEvent = async (req, res, next) => {
    try {
        // Validation des données requises
        // if (!req.file) {
        //     return res.status(400).json({ error: 'Thumbnail image is required' });
        // }

        if (!req.auth || !req.auth.userId) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        if (req.body.userId) {
            return res.status(401).json({ error: 'Authentification échouée' })
        }

        // Construction de l'URL de l'image
        const thumbnailUrl = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : undefined


        // Création de l'événement
        delete req.body.creatorId
        const eventData = {
            ...req.body,
            creatorId: req.auth.userId,
            thumbnail: thumbnailUrl
        };

        // Gestion des champs JSON si besoin
        // if (typeof req.body.location === 'string') {
        //     try {
        //         eventData.location = JSON.parse(req.body.location);
        //     } catch (e) {
        //         return res.status(400).json({ error: 'Invalid location format' });
        //     }
        // }

        // if (typeof req.body.ticketSettings === 'string') {
        //     try {
        //         eventData.ticketSettings = JSON.parse(req.body.ticketSettings);
        //     } catch (e) {
        //         return res.status(400).json({ error: 'Invalid ticket settings format' });
        //     }
        // }

        const event = new Event(eventData);
        await event.save();

        res.status(201).json({
            message: 'Event created successfully',
            eventId: event._id
        });

    } catch (error) {
        console.error('Error creating event:', error);

        // Gestion spécifique des erreurs
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                error: 'Validation error',
                details: error.errors
            });
        }

        if (error.code === 11000) { // Duplicate key
            return res.status(409).json({
                error: 'Event with similar data already exists'
            });
        }

        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
};