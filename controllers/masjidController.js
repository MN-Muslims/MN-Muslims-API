const mongoose = require('mongoose')
const Masjid = require('../models/MasjidModel')

const getMasjids = async (req, res) => {
    const masjids = await Masjid.find({})

    res.status(200).json(masjids)
}

// description1: {
//     type: Schema.Types.Mixed,
//     // required: true
// },
// // phone number of organization
// description2: {
//     type: Schema.Types.Mixed,
//     // required: true
// },
// // links to businesses website, social media
// description3: {
//     type: Schema.Types.Mixed,
//     // required: true
// },

// }, { timestamps: true })




module.exports = {
    getMasjids
}