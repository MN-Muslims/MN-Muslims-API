// CarouselModel.js
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const carouselSchema = new Schema({
// 
    description1: {
        type: Schema.Types.Mixed,
        // required: true
    },
    // phone number of organization
    description2: {
        type: Schema.Types.Mixed,
        // required: true
    },
    // links to businesses website, social media
    description3: {
        type: Schema.Types.Mixed,
        // required: true
    },
    image1: {
        type: Schema.Types.Mixed,
    },
    image2: {
        type: Schema.Types.Mixed,
    },
    image3: {
        type: Schema.Types.Mixed,
    },

}, { timestamps: true })


module.exports = mongoose.model('announcements', carouselSchema)
