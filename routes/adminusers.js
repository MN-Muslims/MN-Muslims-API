const express = require('express');
const router = express.Router();

const UserController = require('../controllers/adminUserController');

router.get('/', UserController.getAllUsers);

router.post('/register', UserController.register);

router.post('/login', UserController.login);


router.delete('/:userId', UserController.deleteUser);

module.exports = router;
