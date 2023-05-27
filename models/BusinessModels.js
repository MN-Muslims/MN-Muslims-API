const mongoose = require('mongoose')
const Schema = mongoose.Schema

const businessSchema = new Schema({
    // name of organization
    title: {
        type: String,
        required: true
    },
    // description of organization
    description: {
        type: String,
        required: true
    },
    // address of organization
    address: {
        type: Schema.Types.Mixed,
        required: true
    },
    // phone number of organization
    number: {
        type: Schema.Types.Mixed,
        required: true
    },
    // list of services
    services: {
        type: String,
        required: true
    },
    // links to businesses website, social media
    links: {
        type: Schema.Types.Mixed,
        required: true
    },
    // operational hours
    workingHours: {
        type: Schema.Types.Mixed,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model('Business', businessSchema)