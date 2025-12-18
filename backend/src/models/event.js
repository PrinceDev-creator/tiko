const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Le titre est obligatoire'],
        trim: true,
        maxLength: [100, 'Le titre ne peut pas dépasser 100 caractères']
    },
    description: {
        type: String,
        required: [true, 'La description est obligatoire'],
        maxLength: [2000, 'La description ne peut pas dépasser 2000 caractères']
    },
    startDateTime: {  // Fusion date + heure
        type: Date,
        required: true
    },
    endDateTime: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > this.startDateTime
            },
            message: 'La date de fin doit être après la date de début'
        }
    },
    location: {
        venue: { type: String, required: true },  // Nom du lieu
        address: {
            street: String,
            city: { type: String, required: true },
            postalCode: String,
            country: { type: String, default: 'France' }
        },
        coordinates: {
            lat: Number,
            lng: Number
        }
    },
    category: {
        type: String,
        required: true,
        enum: ['CONCERT', 'CONFERENCE', 'SPORT', 'THEATER', 'FESTIVAL', 'WORKSHOP', 'OTHER'],
        default: 'OTHER'
    },
    status: {
        type: String,
        enum: ['DRAFT', 'PUBLISHED', 'CANCELLED', 'COMPLETED'],
        default: 'DRAFT'
    },
    thumbnail: {
        type: String,
        required: false  // Rendre optionnel selon besoin
    },
    images: [String],  // Galerie d'images
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Gestion des billets
    // ticketSettings: {
    //     maxAttendees: { type: Number, required: true },
    //     availableTickets: { type: Number, required: true },
    //     ticketTypes: [{
    //         name: { type: String, required: true },  // "VIP", "Standard"
    //         price: { type: Number, required: true },
    //         quantity: { type: Number, required: true },
    //         description: String
    //     }]
    // },
    // Paramètres d'accès
    accessControl: {
        isPublic: { type: Boolean, default: true },
        ageRestriction: { type: Number, min: 0 },  // Âge minimum
        requiresApproval: { type: Boolean, default: false }
    },
    // Informations supplémentaires
    website: String,
    contactEmail: String,
    contactPhone: String,
}, {
    timestamps: true
})

// Index pour performances
eventSchema.index({ startDateTime: 1 })
eventSchema.index({ 'location.city': 1 })
eventSchema.index({ category: 1 })
eventSchema.index({ status: 1 })

module.exports = mongoose.model('Event', eventSchema)