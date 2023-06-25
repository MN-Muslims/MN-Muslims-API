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
}, { timestamps: true });

module.exports = mongoose.model('announcements', carouselSchema);
