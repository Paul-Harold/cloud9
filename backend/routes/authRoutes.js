const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Ensure this model is correctly defined and imported
const router = express.Router();

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"
  if (!token) return res.status(403).json({ error: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user.' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Error logging in.' });
  }
});

// Update Account
router.put('/update', verifyToken, async (req, res) => {
  const { username, email } = req.body;

  if (!username && !email) {
    return res.status(400).json({ error: 'No update data provided.' });
  }

  try {
    const updatedData = {};
    if (username) updatedData.username = username;
    if (email) updatedData.email = email;

    // Find and update user by ID
    const user = await User.findByIdAndUpdate(req.user.id, updatedData, { new: true });

    if (!user) return res.status(404).json({ error: 'User not found.' });

    res.json({ message: 'User updated successfully.', user });
  } catch (err) {
    res.status(500).json({ error: 'Error updating account.' });
  }
});

module.exports = router;
