const express = require('express')
const router = express.Router()
const {
    getMasjids,
} = require('../controllers/masjidController')

// GET all businesses
router.get('/', getMasjids)


module.exports = router;