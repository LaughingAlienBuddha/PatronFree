import admin from '../config/firebase.js';
import User from '../models/User.js';

/**
 * Middleware to verify Firebase ID Token and attach user to request
 * Expected header: Authorization: Bearer <idToken>
 */
export const verifyFirebaseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Use: Authorization: Bearer <idToken>',
      });
    }

    const idToken = authHeader.split('Bearer ')[1];

    // Verify token with Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // Extract Firebase user info
    const firebaseUser = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name || decodedToken.email.split('@')[0],
      picture: decodedToken.picture || null,
      provider: decodedToken.firebase?.sign_in_provider || 'email',
    };

    // Check if user exists in database
    let user = await User.findOne({ firebaseUID: firebaseUser.uid });

    // If user doesn't exist, create new profile dynamically
    if (!user) {
      user = new User({
        firebaseUID: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.name,
        profilePic: firebaseUser.picture,
        provider: firebaseUser.provider,
        providerData: {
          name: firebaseUser.name,
          photoURL: firebaseUser.picture,
        },
        username: firebaseUser.email.split('@')[0].toLowerCase(),
      });

      await user.save();
      console.log(`✅ New user created: ${firebaseUser.email}`);
    } else {
      // Update last login and sync Firebase data
      user.lastLogin = new Date();

      // Update profile pic if Firebase has newer one
      if (firebaseUser.picture && firebaseUser.picture !== user.profilePic) {
        user.profilePic = firebaseUser.picture;
      }

      // Update name if it changed in Firebase
      if (firebaseUser.name && firebaseUser.name !== user.name) {
        user.name = firebaseUser.name;
      }

      await user.save();
    }

    // Attach user and Firebase data to request
    req.user = user;
    req.firebaseUser = firebaseUser;

    next();
  } catch (error) {
    console.error('🔐 Token verification error:', error.message);

    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({
        success: false,
        message: 'Token expired. Please login again.',
      });
    }

    if (error.code === 'auth/invalid-id-token') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.',
      });
    }

    res.status(401).json({
      success: false,
      message: 'Authentication failed',
      error: error.message,
    });
  }
};

/**
 * Optional: Middleware to check if user has specific role
 */
export const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized for this action',
      });
    }

    next();
  };
};
