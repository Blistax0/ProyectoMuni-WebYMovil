const express = require('express');
const router = express.Router();
const { login } = require('../../../features/auth/presentation/authController');

// POST /api/auth/login
router.post('/login', login);

module.exports = router;
