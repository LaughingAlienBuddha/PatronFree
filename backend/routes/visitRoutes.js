import express from 'express';
import {
  trackVisit,
  getVisitHistory,
  getVisitStats,
} from '../controllers/visitController.js';
import { verifyFirebaseToken } from '../middleware/firebaseAuth.js';

const router = express.Router();

/**
 * POST /api/visit/:userId
 * Track a visit to a user's profile
 */
router.post('/:userId', verifyFirebaseToken, trackVisit);

/**
 * GET /api/visit/:userId/history
 * Get visit history for a profile (only owner can view)
 */
router.get('/:userId/history', verifyFirebaseToken, getVisitHistory);

/**
 * GET /api/visit/:userId/stats
 * Get visit statistics (only owner can view)
 */
router.get('/:userId/stats', verifyFirebaseToken, getVisitStats);

export default router;
