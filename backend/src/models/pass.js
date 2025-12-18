const mongoose = require('mongoose')

const passSchema = mongoose.Schema({
    attendeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    typePassEvent: { type: mongoose.Schema.Types.ObjectId, ref: 'PassInfos', required: true },
    editTime: { type: Date, required: true },
    isActive: { type: Boolean, default: true }, //Active or Inactive
    // checkedIn: { type: Boolean, default: false }, //Used or unused
    checkedInTime: {
        type: [{
            timestamp: { type: Date, default: Date.now() }
        }],
    },
    scanNumberAtTheMoment: { type: Number, default: 0 },
    scanTotalNumber: { type: Number, default: 0 }
    // seatNumber: { type: String, required: false }, //Place number
    // gate: { type: String, required: false }, //Enter gate
    // section: { type: String, required: false } //Place Zone
}, {
    timestamps: true //createdAt and updateAt created automatically
})

passSchema.index({ ticketType: 1 })

module.exports = mongoose.model('Pass', passSchema)