# 🔥 Firebase-Integrated Backend Guide

## Overview

Your backend is now fully integrated with Firebase Authentication! The backend uses Firebase Admin SDK to verify tokens and automatically creates/updates user profiles based on Firebase user data.

**Key Features:**
- ✅ Firebase ID Token verification
- ✅ Automatic user profile creation on first request
- ✅ Dynamic name and profile picture sync from Firebase
- ✅ No manual login/signup implementation
- ✅ Supports Google, GitHub, and Email/Password authentication

---

## Setup Instructions

### 1. Get Firebase Service Account

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Project Settings** → **Service Accounts**
4. Click **Generate New Private Key**
5. This downloads a JSON file with your credentials

### 2. Add Firebase Credentials to Backend

```bash
cd backend
cp .env.example .env
```

Open `.env` and add your service account details:

```env
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your_client_id
FIREBASE_CLIENT_X509_CERT_URL=your_cert_url
```

⚠️ **Important:** Keep `FIREBASE_PRIVATE_KEY` as a single line with `\n` for newlines (not actual line breaks)

### 3. Install Dependencies

```bash
npm install
```

This will install `firebase-admin` package.

### 4. Start Backend

```bash
npm run dev
```

You should see:
```
✅ Firebase Admin SDK initialized
🚀 Server running on http://localhost:5000
🔐 Firebase Auth enabled
🗄️  MongoDB connected
```

---

## How It Works

### Authentication Flow

1. **Frontend Login** (Firebase handles it)
   ```
   User logs in via Google/GitHub/Email
   ↓
   Firebase returns ID Token
   ```

2. **Frontend Makes Request** (sends ID Token)
   ```
   GET /api/profile
   Authorization: Bearer <idToken>
   ```

3. **Backend Verifies Token** (Firebase Admin SDK)
   ```
   Middleware verifies token signature
   Extracts user info (uid, email, name, photo)
   ↓
   ```

4. **Auto-Create or Sync Profile**
   ```
   If user exists in DB:
     - Update lastLogin
     - Sync name/photo if changed
   
   If user doesn't exist:
     - Create new user profile
     - Store Firebase UID, email, name, photo
     - Auto-generate username from email
   ```

5. **Request Processes**
   ```
   req.user = MongoDB user object
   req.firebaseUser = Firebase user data
   ↓
   Response sent
   ```

---

## API Endpoints

### Profile Management

#### Get My Profile
```
GET /api/profile
Authorization: Bearer <idToken>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "user_id",
    "firebaseUID": "firebase_uid",
    "email": "user@example.com",
    "name": "John Doe",
    "profilePic": "https://...",
    "provider": "google",
    "role": "creator",
    "bio": "Welcome to my profile!",
    "uploads": [],
    "totalVisits": 42,
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

#### Get Public Profile
```
GET /api/profile/:userId
Authorization: Bearer <idToken>
```

#### Update Profile
```
PUT /api/profile
Authorization: Bearer <idToken>
Content-Type: application/json

{
  "bio": "Updated bio",
  "role": "developer",
  "isPublic": true
}
```

**Note:** Name comes from Firebase and cannot be changed here. If Firebase name updates, it syncs automatically.

#### Upload Profile Picture
```
POST /api/profile/upload-picture
Authorization: Bearer <idToken>
Content-Type: application/json

{
  "pictureUrl": "https://cloudinary.com/your-image.jpg"
}
```

#### Upload File
```
POST /api/profile/upload-file
Authorization: Bearer <idToken>
Content-Type: application/json

{
  "fileUrl": "https://cloudinary.com/your-video.mp4",
  "fileName": "my-video.mp4",
  "fileType": "video",
  "description": "My awesome video"
}
```

#### Get User Uploads
```
GET /api/profile/:userId/uploads
```

#### Delete Upload
```
DELETE /api/profile/upload/:uploadId
Authorization: Bearer <idToken>
```

### Visit Tracking

#### Track Visit
```
POST /api/visit/:userId
Authorization: Bearer <idToken>
```

**Response:**
```json
{
  "success": true,
  "message": "Visit tracked successfully",
  "data": {
    "visitId": "visit_id",
    "timestamp": "2024-01-15T10:00:00Z"
  }
}
```

#### Get Visit History
```
GET /api/visit/:userId/history?limit=20&skip=0
Authorization: Bearer <idToken>
```

Only the profile owner can view their own visit history.

#### Get Visit Statistics
```
GET /api/visit/:userId/stats
Authorization: Bearer <idToken>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalVisits": 150,
    "uniqueVisitors": 45,
    "visitsLastWeek": 28,
    "visitsLastMonth": 120,
    "topVisitors": [
      {
        "visitorId": "visitor_1",
        "visitorName": "Alice",
        "count": 15
      }
    ],
    "dailyVisits": [
      {
        "_id": "2024-01-15",
        "count": 10
      }
    ]
  }
}
```

---

## Frontend Implementation

### 1. Sign In Page

```typescript
// app/signin/page.tsx
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { apiCall, getFirebaseIdToken } from '@/lib/api-client';

export default function SignInPage() {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // User is now logged in with Firebase
      // Next request will automatically use Firebase ID token
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleEmailLogin = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
}
```

### 2. Get Profile

```typescript
import { useEffect, useState } from 'react';
import { apiCall } from '@/lib/api-client';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiCall('/profile');
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h1>Welcome, {profile?.name}!</h1>
      <img src={profile?.profilePic} alt="profile" />
    </div>
  );
}
```

### 3. Update Profile

```typescript
const handleUpdateProfile = async (bio: string, role: string) => {
  try {
    const response = await apiCall('/profile', {
      method: 'PUT',
      body: JSON.stringify({ bio, role }),
    });
    console.log('Profile updated:', response.data);
  } catch (error) {
    console.error('Update failed:', error);
  }
};
```

### 4. Upload File (Using Cloudinary)

```typescript
import { CldUploadWidget } from 'next-cloudinary';
import { apiCall } from '@/lib/api-client';

export default function UploadPage() {
  const handleUpload = async (result: any) => {
    const { secure_url, public_id } = result.info;

    try {
      const response = await apiCall('/profile/upload-file', {
        method: 'POST',
        body: JSON.stringify({
          fileUrl: secure_url,
          fileName: public_id,
          fileType: 'image',
          description: 'Uploaded from Cloudinary',
        }),
      });
      console.log('File uploaded:', response.data);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <CldUploadWidget onSuccess={handleUpload}>
      {({ open }) => (
        <button onClick={() => open()}>Upload File</button>
      )}
    </CldUploadWidget>
  );
}
```

### 5. Track Visit

```typescript
import { apiCall } from '@/lib/api-client';

export default function UserProfile({ userId }: { userId: string }) {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        await apiCall(`/visit/${userId}`, {
          method: 'POST',
        });
      } catch (error) {
        console.error('Failed to track visit:', error);
      }
    };

    trackVisit();
  }, [userId]);

  return <div>User Profile</div>;
}
```

---

## Authentication Middleware

The backend has a reusable Firebase authentication middleware:

```typescript
// middleware/firebaseAuth.js
import { verifyFirebaseToken, authorize } from '../middleware/firebaseAuth.js';

// Protect any route:
router.get('/api/protected', verifyFirebaseToken, (req, res) => {
  console.log(req.user);        // MongoDB user object
  console.log(req.firebaseUser); // Firebase user data
  res.json({ user: req.user });
});

// Restrict by role:
router.post(
  '/api/creator-only',
  verifyFirebaseToken,
  authorize(['creator']),
  controllerFunction
);
```

---

## User Profile Structure

When a user logs in for the first time, this is created:

```javascript
{
  firebaseUID: "google-oauth2|1234567890",     // Firebase UID
  email: "user@example.com",
  name: "John Doe",                            // From Firebase displayName
  profilePic: "https://lh3.googleusercontent.com/...",
  provider: "google",                          // google | github | email
  providerData: {
    name: "John Doe",
    photoURL: "https://..."
  },
  role: "supporter",                           // creator | developer | supporter
  username: "johndoe",                         // Auto-generated from email
  bio: "",
  uploads: [],
  visits: [],
  isPublic: true,
  lastLogin: "2024-01-15T10:00:00Z",
  totalVisits: 0,
  settings: {
    emailNotifications: true,
    profileVisibility: "public"
  },
  createdAt: "2024-01-15T10:00:00Z",
  updatedAt: "2024-01-15T10:00:00Z"
}
```

---

## Testing with Postman

### 1. Get Firebase ID Token

In your frontend console:
```javascript
const token = await firebase.auth().currentUser.getIdToken();
console.log(token);
```

### 2. Add to Postman

1. Create a GET request: `http://localhost:5000/api/profile`
2. Go to **Headers**
3. Add: `Authorization: Bearer <your_id_token>`
4. Send request

---

## Environment Variables Checklist

```bash
✅ FIREBASE_PROJECT_ID
✅ FIREBASE_PRIVATE_KEY_ID
✅ FIREBASE_PRIVATE_KEY
✅ FIREBASE_CLIENT_EMAIL
✅ FIREBASE_CLIENT_ID
✅ FIREBASE_CLIENT_X509_CERT_URL
✅ MONGODB_URI
✅ PORT
✅ FRONTEND_URL
```

---

## Common Issues

### Issue: "Invalid token" Error
**Solution:** Make sure the ID token is fresh (< 1 hour old). Use `getIdToken(true)` to force refresh.

### Issue: "User not found after login"
**Solution:** The user profile is created automatically. Check MongoDB connection.

### Issue: Profile name not syncing
**Solution:** The sync happens on every request. If Firebase name changed, make any API call.

### Issue: CORS errors
**Solution:** Update `FRONTEND_URL` in `.env` to match your frontend URL.

---

## Security Features

✅ **Firebase ID Token Verification** - Validates every request  
✅ **Automatic UID Uniqueness** - Prevents duplicate accounts  
✅ **Rate Limiting** - Prevents abuse (100 req/15min per IP)  
✅ **CORS Protection** - Only allows specified frontend  
✅ **Helmet Security Headers** - Additional security  
✅ **Ownership Verification** - Users can only modify their own data  
✅ **Private Profile Support** - Control who sees your profile  

---

## Production Deployment

### 1. Update Environment Variables

```bash
FIREBASE_PROJECT_ID=production_project_id
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/patronex
FRONTEND_URL=https://yourdomain.com
NODE_ENV=production
PORT=5000
```

### 2. Deploy Backend

Using Render or Railway:

```bash
npm install
npm start
```

### 3. Update Frontend

Update `NEXT_PUBLIC_API_URL` environment variable:

```env
NEXT_PUBLIC_API_URL=https://your-backend.com/api
```

---

## Support

For issues or questions:
1. Check Firebase Console for authentication logs
2. Check MongoDB Atlas for data
3. Review server logs: `pm2 logs` or your hosting provider's logs
4. Enable debug: `DEBUG=*` npm run dev

---

**Happy building! 🚀**
