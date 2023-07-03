const express = require('express')
const router = express.Router()
const {
    getCarousels,
    createCarouselData,
    deleteCarouselData,
    updateCarouselData
} = require('../controllers/carouselController')

// GET all businesses
router.get('/', getCarousels)

//POST new data
router.post('/', createCarouselData)

// delete data
router.delete('/:id', deleteCarouselData)

// update data
router.patch('/:id', updateCarouselData)

module.exports = router