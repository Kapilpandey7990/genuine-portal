// routes/adminRoutes.js
const express = require('express');
const router =express.Router();
const { adminlogin } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');


// Admin login route
router.post('/adminlogin',adminlogin);

module.exports = router;