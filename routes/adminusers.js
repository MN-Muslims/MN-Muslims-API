// routes.js
const express = require('express');
const router = express.Router();

const UserController = require('../controllers/adminUserController');


// // get all users
// router.get('/users', UserController.getAllUsers);
// Get all users route
router.get('/', UserController.getAllUsers);


// Registration route
router.post('/register', UserController.register);

// Login route
router.post('/login', UserController.login);


module.exports = router;
