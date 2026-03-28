import express from 'express';
import { body } from 'express-validator';
import { signup, login, verifyTokenRoute } from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * @POST /api/auth/signup
 * Create new account
 * Body: { email, password, firstName, lastName, role? }
 */
router.post(
  '/signup',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('firstName').trim().notEmpty(),
    body('lastName').trim().optional(),
  ],
  signup
);

/**
 * @POST /api/auth/login
 * Login user
 * Body: { email, password }
 */
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
  ],
  login
);

/**
 * @POST /api/auth/verify-token
 * Verify JWT token is valid
 * Headers: Authorization: Bearer <token>
 */
router.post('/verify-token', verifyToken, verifyTokenRoute);

export default router;
