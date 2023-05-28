const mongoose = require('mongoose')
const Schema = mongoose.Schema

const masjidSchema = new Schema({
    // name of organization
    Name: {
        type: Schema.Types.Mixed,
        // required: true
    },
    // description of organization
    Address: {
        type: Schema.Types.Mixed,
        // required: true
    },
    // address of organization
    JumuahTimingsAndLanguage: {
        type: Schema.Types.Mixed,
        // required: true
    },
    // phone number of organization
    DailySalat: {
        type: Schema.Types.Mixed,
        // required: true
    },
    // list of services
    OrganizationInfo: {
        type: Schema.Types.Mixed,
        // required: true
    },
    // links to businesses website, social media
    SocialMedia: {
        type: Schema.Types.Mixed,
        // required: true
    },
    // operational hours
    Contact: {
        type: Schema.Types.Mixed,
        // required: true
    },
    // "Additional Notes": "Tutoring and Dugsi"
    AdditionalNotes: {
        type: Schema.Types.Mixed,
        // required: true
    },


}, { timestamps: true })


module.exports = mongoose.model('masjids', masjidSchema)
