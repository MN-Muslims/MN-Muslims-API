const mongoose = require('mongoose')
const Masjid = require('../models/MasjidModel')

const getMasjids = async (req, res) => {
    const masjids = await Masjid.find({})

    res.status(200).json(masjids)
}



module.exports = {
    getMasjids
}