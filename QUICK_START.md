# 🚀 Patronex Backend - Quick Start Guide

Complete setup instructions to get the backend running in 5 minutes.

## Prerequisites

- ✅ Node.js 14+ installed
- ✅ MongoDB (local or Atlas account)
- ✅ npm or yarn

## Step-by-Step Setup

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Create .env File
```bash
cp .env.example .env
```

### Step 4: Configure Environment Variables

Edit `backend/.env`:

**Option A: Local MongoDB**
```env
MONGODB_URI=mongodb://localhost:27017/patronex
JWT_SECRET=your_super_secret_key_min_32_chars
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
MAX_FILE_SIZE=52428800
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create a cluster
4. Get connection string (click Connect button)
5. Paste in .env:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/patronex
```

### Step 5: Start Backend

**Development Mode (with auto-reload)**
```bash
npm run dev
```

**Production Mode**
```bash
npm start
```

✅ You should see:
```
✅ MongoDB Connected: localhost:27017
🚀 Server running on http://localhost:5000
```

---

## ✅ Verify Backend is Working

### Test Health Check
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Backend is running"
}
```

### Test Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "role": "creator"
  }'
```

Expected response (you'll get a token):
```json
{
  "success": true,
  "message": "Account created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "userId": "...",
    "email": "test@example.com",
    "firstName": "John",
    "role": "creator"
  }
}
```

---

## 📋 File Structure Overview

```
backend/
├── config/              # Configuration files
│   ├── database.js      # MongoDB connection
│   └── multer.js        # File upload setup
├── models/              # Database schemas
│   ├── User.js
│   ├── Upload.js
│   └── Visit.js
├── controllers/         # Business logic
│   ├── authController.js
│   ├── profileController.js
│   └── visitController.js
├── routes/              # API endpoints
│   ├── authRoutes.js
│   ├── profileRoutes.js
│   └── visitRoutes.js
├── middleware/          # Custom middleware
│   ├── auth.js          # JWT verification
│   └── errorHandler.js  # Error handling
├── utils/               # Utility functions
├── uploads/             # Uploaded files storage
├── server.js            # Main server file
├── package.json         # Dependencies
├── .env.example         # Environment template
└── README.md            # Full documentation
```

---

## 🔗 API Endpoints Quick Reference

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/verify-token` - Check if token valid

### Profile
- `GET /api/profile/me` - Get your profile
- `GET /api/profile/public/:userId` - Get public profile
- `PUT /api/profile/update` - Update profile
- `POST /api/profile/upload-picture` - Upload profile pic
- `POST /api/profile/upload-file` - Upload media
- `GET /api/profile/:userId/uploads` - Get user's files
- `DELETE /api/profile/upload/:uploadId` - Delete file

### Visit Tracking
- `POST /api/visit/:userId` - Track a visit
- `GET /api/visit/:userId/history` - Get visit history
- `GET /api/visit/:userId/stats` - Get visit statistics

---

## 🧪 Test with Postman

1. **Download Postman** from postman.com
2. **Create new request**
   - Method: POST
   - URL: http://localhost:5000/api/auth/signup
   - Body (JSON):
   ```json
   {
     "email": "user@example.com",
     "password": "password123",
     "firstName": "John",
     "lastName": "Doe"
   }
   ```
3. **Click Send**
4. **Copy the token** from response
5. **Create another request**
   - Method: GET
   - URL: http://localhost:5000/api/profile/me
   - Headers:
     - Key: Authorization
     - Value: Bearer <paste_token_here>
6. **Click Send** - You should get your profile data

---

## 🐛 Common Issues & Solutions

### ❌ "Cannot find module..."
```bash
# Solution: Reinstall dependencies
rm -rf node_modules
npm install
```

### ❌ "MongoDB Connection Error"
```bash
# Check if MongoDB is running
# Local: ensure mongod is running
# Atlas: verify connection string in .env
```

### ❌ "Port 5000 already in use"
```bash
# Find process using port
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or change PORT in .env
```

### ❌ "CORS error in frontend"
```bash
# Update FRONTEND_URL in .env
FRONTEND_URL=http://localhost:3000
```

### ❌ "File upload not working"
```bash
# Ensure uploads folder exists
mkdir -p backend/uploads

# Check file size and type
# Max 50MB, supported: images, videos, pdfs
```

---

## 📱 Connect Frontend

In your Next.js app (`lib/api-client.ts` is already created):

```typescript
import { apiCall, setAuthToken } from '@/lib/api-client';

// Signup
const response = await apiCall('/auth/signup', {
  method: 'POST',
  body: JSON.stringify({
    email, password, firstName, lastName, role
  }),
});

setAuthToken(response.token);
router.push('/dashboard');
```

Full integration guide: See `BACKEND_INTEGRATION.md`

---

## 🚀 Deploy to Production

### Deploy Backend to Render or Railway

1. Push code to GitHub
2. Connect GitHub repo to Render/Railway
3. Add environment variables
4. Deploy

### Update Frontend API URL
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

---

## 📚 Full Documentation

See `README.md` for:
- Detailed API documentation
- Database schema
- Security features
- Advanced configuration

---

## ✨ What's Included

✅ User authentication with JWT
✅ Password hashing with bcrypt
✅ Profile management system
✅ File upload system (images, videos, documents)
✅ Visit tracking and analytics
✅ Role-based access (creator, developer, supporter)
✅ Input validation
✅ Error handling
✅ Rate limiting
✅ CORS security
✅ Production-ready code

---

## 🎯 Next Steps

1. ✅ Backend running locally
2. ✅ Database connected
3. → Test all endpoints in Postman
4. → Update frontend to use API
5. → Test frontend-backend integration
6. → Deploy to production

---

**Need help?** Check the full `README.md` for comprehensive documentation.

**Ready to integrate?** See `BACKEND_INTEGRATION.md` for frontend setup.

---

**Happy coding! 🚀**
