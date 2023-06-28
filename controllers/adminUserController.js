// UserController.js
const User = require('../models/AdminUserModel');
const bcrypt = require('bcryptjs');

const UserController = {

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch users' });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { userId } = req.params;

      // Find the user by userId
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Delete the user from the database
      await User.findByIdAndDelete(userId);

      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete user' });
    }
  },


  register: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Check if the username already exists
      // const existingUser = await User.findOne({ username });
      // if (existingUser) {
      //   return res.status(400).json({ message: 'Username already taken' });
      // }

      // Hash the password
      // const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
        username,
        password
        // password: hashedPassword,
      });

      // Save the user to the database
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Registration failed' });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare the provided password with the stored password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      res.json({ message: 'Login successful' });
    } catch (error) {
      res.status(500).json({ message: 'Login failed' });
    }
  },
};

module.exports = UserController;
