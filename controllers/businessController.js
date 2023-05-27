const Business = require('../models/BusinessModels')
const mongoose = require('mongoose')

// get all organizations
const getBusinesses = async (req, res) => {
    const businesses = await Business.find({}).sort({createdAt: -1})

    res.status(200).json(businesses)
}

// get a single organization
const getBusiness = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'No such Organization' })
    }

    const business = await Business.findById(id)

    if (!business) {
        return res.status(404).json({error: 'No such organization'})
    }

    res.status(200).json(business)
}


// create organization post
const createBusiness = async(req, res) => {
    const {title, description, address, number, services, links, workingHours} = req.body
    // add doc to db
    try{
        const business = await Business.create({title, description, address, number, services, links, workingHours})
        res.status(200).json(business)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

// Delete organization
const deleteBusiness = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'No such Organization' })
    }

    const business = await Business.findOneAndDelete({_id: id})

    if (!business) {
        return res.status(404).json({error: 'No such organization'})
    }

    res.status(200).json(business)
}


// Update organization
const updateBusiness = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'No such Organization' })
    }

    const business = await Business.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!business) {
        return res.status(404).json({error: 'No such organization'})
    }

    res.status(200).json(business)


}



module.exports = {
    createBusiness,
    getBusinesses,
    getBusiness,
    deleteBusiness,
    updateBusiness
}