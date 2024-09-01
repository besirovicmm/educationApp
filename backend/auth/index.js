// auth/index.js
const express = require('express');
const authController = require('./controller');
const router = express.Router();

// POST /api/auth/login
router.post('/login', authController.login);

// POST /api/auth/logout
router.post('/logout', authController.logout);

module.exports = router;