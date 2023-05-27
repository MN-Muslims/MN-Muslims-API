const express = require('express')
const Business = require('../models/BusinessModels')
const router = express.Router()
const {
    createBusiness,
    getBusinesses,
    getBusiness,
    deleteBusiness,
    updateBusiness
} = require('../controllers/businessController')

// GET all businesses
router.get('/', getBusinesses)

// GET single business
router.get('/:id', getBusiness)

//POST new business
router.post('/', createBusiness)
//DELETE a business
router.delete('/:id', deleteBusiness)

// UPDATE  business
router.patch('/:id', updateBusiness)



module.exports = router