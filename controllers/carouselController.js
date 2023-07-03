const mongoose = require('mongoose')
const Carousel = require('../models/CarouselModel')

const getCarousels = async (req, res) => {
    const carousels = await Carousel.find({}).sort({createdAt: -1})

    res.status(200).json(carousels)
}


// create organization post
const createCarouselData = async(req, res) => {
    const {description1, description2, description3} = req.body
    // add to db
    try{
        const carousel = await Carousel.create({description1, description2, description3})
        res.status(200).json(carousel)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

// Delete organization
const deleteCarouselData = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'No such carousel data' })
    }

    const carousel = await Carousel.findOneAndDelete({_id: id})

    if (!carousel) {
        return res.status(404).json({error: 'No such organization'})
    }

    res.status(200).json(carousel)
}

// updateCarouselData
const updateCarouselData = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'No such carousel data' })
    }

    const carousel = await Carousel.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!carousel) {
        return res.status(404).json({error: 'No such organization'})
    }

    res.status(200).json(carousel)


}


module.exports = {
    getCarousels,
    createCarouselData,
    deleteCarouselData,
    updateCarouselData
}