const mongoose = require('mongoose')

const passInfosSchema = mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    ticketType: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, maxLength: 200, default: null },
    validFrom: { type: Date, required: true },
    validUntil: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > this.validFrom
            },
            message: 'La date d\'expiration doit pas être supérieure ou  égale à la date de début'
        }
    },
},
    {
        timestamps: true
    }
)

passInfosSchema.index({ eventId: 1 })

module.exports = mongoose.model('PassInfos', passInfosSchema)
