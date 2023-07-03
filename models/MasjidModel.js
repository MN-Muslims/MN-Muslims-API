const mongoose = require('mongoose')
const Schema = mongoose.Schema

const masjidSchema = new Schema({
    Name: {
        type: Schema.Types.Mixed,
    },
    Address: {
        type: Schema.Types.Mixed,
    },
    JumuahTimingsAndLanguage: {
        type: Schema.Types.Mixed,
    },
    DailySalat: {
        type: Schema.Types.Mixed,
    },
    OrganizationInfo: {
        type: Schema.Types.Mixed,
    },
    SocialMedia: {
        type: Schema.Types.Mixed,
    },
    Contact: {
        type: Schema.Types.Mixed,
    },
    AdditionalNotes: {
        type: Schema.Types.Mixed,
    },


}, { timestamps: true })


module.exports = mongoose.model('masjids', masjidSchema)
