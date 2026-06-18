import express from 'express';
const router = express.Router();
import { login, register } from '../../../features/auth/presentation/authController';

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/register
router.post('/register', register);

export default router;
