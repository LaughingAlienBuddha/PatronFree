import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import config
import connectDB from './config/database.js';
import './config/firebase.js'; // Initialize Firebase Admin SDK

// Import routes
import profileRoutes from './routes/profileRoutes.js';
import visitRoutes from './routes/visitRoutes.js';

// Import middleware
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();

// ============ MIDDLEWARE ============

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Logging
app.use(morgan('combined'));

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

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ============ ROUTES ============

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Backend is running with Firebase Auth ✅' });
});

// Profile routes (all protected by Firebase Auth)
app.use('/api/profile', profileRoutes);

// Visit tracking routes (all protected by Firebase Auth)
app.use('/api/visit', visitRoutes);

// ============ ERROR HANDLING ============

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

// ============ SERVER START ============

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start server
    app.listen(PORT, () => {
      console.log(`\n🚀 Server running on http://localhost:${PORT}`);
      console.log(`📝 API Base URL: http://localhost:${PORT}/api`);
      console.log(`🔐 Firebase Auth enabled`);
      console.log(`🗄️  MongoDB connected`);
      console.log(`🌐 CORS enabled for: ${process.env.FRONTEND_URL || 'http://localhost:3000'}\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
