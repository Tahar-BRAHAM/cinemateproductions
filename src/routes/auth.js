const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route for registering a new user
router.post('/register', register);

// Route for logging in an existing user
router.post('/login', login);

// Route for getting the currently logged-in user's info
router.get('/me', protect, getMe);

// Example route for admin page (adjust as needed)
router.get('/admin', protect, (req, res) => {
    // Return admin page content or render admin page view
    res.send('Admin Page with Upload Functionality');
});

module.exports = router;
