const mongoose = require('mongoose')
const Schema = mongoose.Schema

const businessSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: Schema.Types.Mixed,
        required: true
    },
    number: {
        type: Schema.Types.Mixed,
        required: true
    },
    services: {
        type: String,
        required: true
    },
    links: {
        type: Schema.Types.Mixed,
        required: true
    },
    email: {
        type: Schema.Types.Mixed,
        required: true
    },

    workingHours: {
        type: Schema.Types.Mixed,
        required: true
    }

}, { timestamps: true })


module.exports = mongoose.model('Business', businessSchema)
