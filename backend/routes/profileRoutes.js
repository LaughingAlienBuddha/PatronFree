import express from 'express';
import { body } from 'express-validator';
import {
  getMyProfile,
  getPublicProfile,
  updateProfile,
  uploadProfilePicture,
  uploadFile,
  getUserUploads,
  deleteUpload,
} from '../controllers/profileController.js';
import { verifyFirebaseToken } from '../middleware/firebaseAuth.js';

const router = express.Router();

/**
 * GET /api/profile
 * Get current authenticated user's profile
 */
router.get('/', verifyFirebaseToken, getMyProfile);

/**
 * GET /api/profile/:userId
 * Get public profile of any user
 */
router.get('/:userId', verifyFirebaseToken, getPublicProfile);

/**
 * PUT /api/profile
 * Update current user's profile
 * Body: { bio?, role?, isPublic? }
 */
router.put(
  '/',
  verifyFirebaseToken,
  [
    body('bio')
      .trim()
      .optional()
      .isLength({ max: 500 })
      .withMessage('Bio must be less than 500 characters'),
    body('role')
      .optional()
      .isIn(['creator', 'developer', 'supporter'])
      .withMessage('Invalid role'),
    body('isPublic').optional().isBoolean().withMessage('isPublic must be boolean'),
  ],
  updateProfile
);

/**
 * POST /api/profile/upload-picture
 * Update profile picture
 * Body: { pictureUrl: string }
 */
router.post(
  '/upload-picture',
  verifyFirebaseToken,
  [body('pictureUrl').trim().isURL().withMessage('Invalid picture URL')],
  uploadProfilePicture
);

/**
 * POST /api/profile/upload-file
 * Upload file and link to user
 * Body: { fileUrl, fileName, fileType, description? }
 */
router.post(
  '/upload-file',
  verifyFirebaseToken,
  [
    body('fileUrl').trim().isURL().withMessage('Invalid file URL'),
    body('fileName').trim().notEmpty().withMessage('File name is required'),
    body('fileType')
      .optional()
      .isIn(['image', 'video', 'document', 'other'])
      .withMessage('Invalid file type'),
    body('description').trim().optional().isLength({ max: 500 }),
  ],
  uploadFile
);

/**
 * GET /api/profile/:userId/uploads
 * Get all uploads for a user
 */
router.get('/:userId/uploads', getUserUploads);

/**
 * DELETE /api/profile/upload/:uploadId
 * Delete an upload (only owner can delete)
 */
router.delete(
  '/upload/:uploadId',
  verifyFirebaseToken,
  deleteUpload
);

export default router;
