import express from 'express';
const router = express.Router();
import { login  } from '../../../features/auth/presentation/authController';

// POST /api/auth/login
router.post('/login', login);

export default router;
