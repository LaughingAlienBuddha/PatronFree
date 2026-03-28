# Firebase Backend - Examples & Code Snippets

## 🔄 Frontend Implementation Examples

### 1. Get User Profile

```typescript
// pages/dashboard/page.tsx
import { useEffect, useState } from 'react';
import { apiCall } from '@/lib/api-client';
import { auth } from '@/lib/firebase';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        // API client automatically includes Firebase ID token
        const response = await apiCall('/profile');
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };

    // Only load if user is authenticated
    if (auth.currentUser) {
      loadProfile();
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>Not authenticated</div>;

  return (
    <div>
      <h1>Welcome, {profile.name}!</h1>
      {profile.profilePic && (
        <img src={profile.profilePic} alt={profile.name} />
      )}
      <p>Email: {profile.email}</p>
      <p>Role: {profile.role}</p>
      <p>Bio: {profile.bio}</p>
      <p>Profile Views: {profile.totalVisits}</p>
    </div>
  );
}
```

### 2. Update Profile

```typescript
// components/ProfileEditor.tsx
import { useState } from 'react';
import { apiCall } from '@/lib/api-client';

export default function ProfileEditor({ onSuccess }) {
  const [bio, setBio] = useState('');
  const [role, setRole] = useState('supporter');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiCall('/profile', {
        method: 'PUT',
        body: JSON.stringify({ bio, role }),
      });

      console.log('Profile updated:', response.data);
      onSuccess?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Tell us about yourself..."
        maxLength={500}
      />

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="supporter">Supporter</option>
        <option value="creator">Creator</option>
        <option value="developer">Developer</option>
      </select>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Profile'}
      </button>
    </form>
  );
}
```

### 3. Upload File

```typescript
// components/FileUploader.tsx
import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { apiCall } from '@/lib/api-client';

export default function FileUploader() {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (result) => {
    const { secure_url, resource_type } = result.info;

    setLoading(true);
    try {
      const response = await apiCall('/profile/upload-file', {
        method: 'POST',
        body: JSON.stringify({
          fileUrl: secure_url,
          fileName: result.event.split('/').pop(),
          fileType: resource_type === 'video' ? 'video' : 'image',
          description: 'Uploaded from Cloudinary',
        }),
      });

      console.log('File uploaded:', response.data);
      // Refresh uploads list
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CldUploadWidget
      uploadPreset="your_cloudinary_preset"
      onSuccess={handleUpload}
    >
      {({ open }) => (
        <button
          onClick={() => open()}
          disabled={loading}
          className="btn-upload"
        >
          {loading ? 'Uploading...' : 'Upload File'}
        </button>
      )}
    </CldUploadWidget>
  );
}
```

### 4. Track Profile Visit

```typescript
// components/UserProfileCard.tsx
import { useEffect } from 'react';
import { apiCall } from '@/lib/api-client';

export default function UserProfileCard({ userId }) {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        // Track that current user visited this profile
        await apiCall(`/visit/${userId}`, {
          method: 'POST',
        });
      } catch (error) {
        // Silently fail for analytics
        console.log('Visit tracking skipped:', error.message);
      }
    };

    trackVisit();
  }, [userId]);

  return (
    <div className="profile-card">
      {/* Profile content */}
    </div>
  );
}
```

### 5. Get Visit Statistics

```typescript
// pages/analytics/page.tsx
import { useEffect, useState } from 'react';
import { apiCall } from '@/lib/api-client';
import { auth } from '@/lib/firebase';

export default function AnalyticsPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        if (!auth.currentUser) return;

        const response = await apiCall(`/visit/${auth.currentUser.uid}/stats`);
        setStats(response.data);
      } catch (error) {
        console.error('Failed to load stats:', error);
      }
    };

    loadStats();
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div>
      <h1>Profile Analytics</h1>

      <div className="stats-grid">
        <div className="stat">
          <h3>Total Visits</h3>
          <p className="number">{stats.totalVisits}</p>
        </div>

        <div className="stat">
          <h3>Unique Visitors</h3>
          <p className="number">{stats.uniqueVisitors}</p>
        </div>

        <div className="stat">
          <h3>This Week</h3>
          <p className="number">{stats.visitsLastWeek}</p>
        </div>

        <div className="stat">
          <h3>This Month</h3>
          <p className="number">{stats.visitsLastMonth}</p>
        </div>
      </div>

      <h2>Top Visitors</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Visits</th>
          </tr>
        </thead>
        <tbody>
          {stats.topVisitors.map((visitor) => (
            <tr key={visitor.visitorId}>
              <td>{visitor.visitorName}</td>
              <td>{visitor.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## 🔗 How the API Client Works

```typescript
// lib/api-client.ts automatically does this:

import { auth } from './firebase';

export async function apiCall(endpoint, options = {}) {
  // 1. Get current user from Firebase
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  // 2. Get fresh ID token (auto-refreshes if expired)
  const idToken = await user.getIdToken(true);

  // 3. Add to request header
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${idToken}`,
  };

  // 4. Make request
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // 5. Parse and return
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
}
```

---

## 🔐 Backend Middleware

```javascript
// middleware/firebaseAuth.js automatically does this:

import admin from '../config/firebase.js';
import User from '../models/User.js';

export const verifyFirebaseToken = async (req, res, next) => {
  try {
    // 1. Extract token from header
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) throw new Error('No token provided');

    // 2. Verify with Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);

    // 3. Extract user info
    const firebaseUser = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name,
      picture: decodedToken.picture,
      provider: decodedToken.firebase.sign_in_provider,
    };

    // 4. Check if user exists in DB
    let user = await User.findOne({ firebaseUID: firebaseUser.uid });

    // 5. If not, auto-create
    if (!user) {
      user = new User({
        firebaseUID: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.name,
        profilePic: firebaseUser.picture,
        provider: firebaseUser.provider,
      });
      await user.save();
    }
    // 6. If yes, sync data
    else {
      user.lastLogin = new Date();
      if (firebaseUser.picture && firebaseUser.picture !== user.profilePic) {
        user.profilePic = firebaseUser.picture;
      }
      await user.save();
    }

    // 7. Attach to request
    req.user = user;
    req.firebaseUser = firebaseUser;

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Auth failed' });
  }
};
```

---

## 📊 Database Queries

### Get User Profile
```javascript
// controllers/profileController.js
export const getMyProfile = async (req, res) => {
  // req.user is already populated by middleware
  const user = await User.findById(req.user._id)
    .populate('uploads')
    .populate('visits');

  res.json({ success: true, data: user });
};
```

### Create Visit Record
```javascript
// controllers/visitController.js
export const trackVisit = async (req, res) => {
  const { userId } = req.params;

  // req.user is the visitor (automatically populated by middleware)
  const visit = new Visit({
    profileUserId: userId,
    visitorId: req.user._id,
    visitorName: req.user.name,
    visitorEmail: req.user.email,
  });

  await visit.save();

  // Update user's visit count
  await User.findByIdAndUpdate(userId, {
    $inc: { totalVisits: 1 },
    $push: { visits: visit._id },
  });

  res.json({ success: true, data: visit });
};
```

---

## 🧪 Testing with Postman

### Step 1: Get Firebase ID Token
```javascript
// In browser console
const token = await firebase.auth().currentUser.getIdToken();
console.log(token);
// Copy this token
```

### Step 2: Set Postman Authorization
```
Headers:
Key: Authorization
Value: Bearer <paste_token_here>
```

### Step 3: Test Endpoints
```
GET    http://localhost:5000/api/profile
GET    http://localhost:5000/api/profile/:userId
PUT    http://localhost:5000/api/profile
       Body: { "bio": "Hello", "role": "creator" }

POST   http://localhost:5000/api/visit/:userId
GET    http://localhost:5000/api/visit/:userId/stats
```

---

## ✨ Error Handling

### Frontend
```typescript
try {
  const response = await apiCall('/profile');
  console.log('Success:', response.data);
} catch (error) {
  // error.message is the error message from backend
  if (error.message.includes('Not authenticated')) {
    // Token expired or user not logged in
    router.push('/signin');
  } else {
    // Other error
    console.error('API Error:', error.message);
  }
}
```

### Backend
```javascript
// All endpoints return consistent error format
res.status(401).json({
  success: false,
  message: 'User not authenticated',
  error: 'Token verification failed',
});

res.status(404).json({
  success: false,
  message: 'User not found',
});

res.status(500).json({
  success: false,
  message: 'Error updating profile',
  error: error.message,
});
```

---

## 🚀 Production Checklist

- [ ] Firebase service account in `.env`
- [ ] MongoDB URI configured
- [ ] FRONTEND_URL matches deployment domain
- [ ] `npm install` successful
- [ ] `npm run dev` starts without errors
- [ ] Health check passes: `GET /api/health`
- [ ] Profile endpoint works with Firebase token
- [ ] File uploads tested
- [ ] Visit tracking verified
- [ ] Error handling tested
- [ ] Rate limiting tested
- [ ] CORS verified

---

**Start here:** `FIREBASE_SETUP_QUICK.md` → `FIREBASE_BACKEND_GUIDE.md`

**Your backend is production-ready! 🎉**
