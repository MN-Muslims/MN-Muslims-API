const express = require('express')
const router = express.Router()
const {
    getCarousels,
} = require('../controllers/carouselController')

// GET all businesses
router.get('/', getCarousels)


// Export the router
module.exports = router;
