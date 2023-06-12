const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carouselSchema = new Schema({
    description1: {
        type: Schema.Types.Mixed,
    },
    description2: {
        type: Schema.Types.Mixed,
    },
    description3: {
        type: Schema.Types.Mixed,
    },
    image1: {
        type: String,
    },
    image2: {
        type: String,
    },
    image3: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('announcements', carouselSchema);
