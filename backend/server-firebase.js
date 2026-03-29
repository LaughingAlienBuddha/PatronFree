import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin SDK
const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Initialize Express app
const app = express();

// ============ MIDDLEWARE ============

// Security middleware
app.use(helmet());

// CORS configuration for Vercel
app.use(cors({
  origin: process.env.FRONTEND_URL || ['http://localhost:3000', 'https://your-frontend-domain.vercel.app'],
  credentials: true,
}));

// Logging (disable in test environment)
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', limiter);

// ============ ROUTES ============

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Backend is running with Firebase Firestore ✅',
    database: 'Firebase Firestore'
  });
});

// Profile routes using Firebase Firestore
app.get('/api/profile', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const { getAuth } = await import('firebase-admin/auth');
    const decodedToken = await getAuth().verifyIdToken(token);
    
    // Get user profile from Firestore
    const userDoc = await db.collection('users').doc(decodedToken.uid).get();
    
    if (!userDoc.exists) {
      // Create basic profile if doesn't exist
      await db.collection('users').doc(decodedToken.uid).set({
        email: decodedToken.email,
        name: decodedToken.name || decodedToken.email.split('@')[0],
        role: 'supporter',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    const profile = (await db.collection('users').doc(decodedToken.uid).get()).data();
    
    res.json({ success: true, profile });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

// Update profile
app.put('/api/profile', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const { getAuth } = await import('firebase-admin/auth');
    const decodedToken = await getAuth().verifyIdToken(token);
    
    const { name, bio, role, username } = req.body;
    
    // Update profile in Firestore
    await db.collection('users').doc(decodedToken.uid).update({
      name,
      bio,
      role,
      username,
      updatedAt: new Date()
    });
    
    res.json({ success: true, message: 'Profile updated' });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Visit tracking
app.post('/api/visit', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const { getAuth } = await import('firebase-admin/auth');
    const decodedToken = await getAuth().verifyIdToken(token);
    
    const { profileUserId } = req.body;
    
    // Record visit in Firestore
    await db.collection('visits').add({
      profileUserId,
      visitorId: decodedToken.uid,
      visitorName: decodedToken.name || decodedToken.email.split('@')[0],
      visitorEmail: decodedToken.email,
      createdAt: new Date()
    });
    
    res.json({ success: true, message: 'Visit recorded' });
  } catch (error) {
    console.error('Visit error:', error);
    res.status(500).json({ error: 'Failed to record visit' });
  }
});

// ============ ERROR HANDLING ============

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ============ EXPORT ============

export default app;
