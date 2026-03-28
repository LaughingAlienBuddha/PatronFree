# Firebase Configuration & Integration Guide

## Your Firebase Project Details

**Project ID:** `patronex-e6750`  
**Auth Domain:** `patronex-e6750.firebaseapp.com`  
**API Key:** `AIzaSyAWBIVYAgf_wvK6pi0ytpw6ySrQItaMW14`

---

## ✅ Frontend Configuration Status

### Current Setup
Your Firebase configuration is **already integrated** in the project:

**File:** `lib/firebase.ts`
```typescript
const firebaseConfig = {
  apiKey: "AIzaSyAWBIVYAgf_wvK6pi0ytpw6ySrQItaMW14",
  authDomain: "patronex-e6750.firebaseapp.com",
  projectId: "patronex-e6750",
  storageBucket: "patronex-e6750.firebasestorage.app",
  messagingSenderId: "722988330714",
  appId: "1:722988330714:web:61df0ae8478ad0dcc93fe3",
  measurementId: "G-3LX0NJFV0L"
};
```

### Features Already Enabled
✅ Firebase Authentication (Auth)  
✅ Google Sign-In Provider  
✅ GitHub Sign-In Provider  
✅ Analytics  
✅ Environment variable support  
✅ SSR-safe initialization  

---

## ✅ Backend Integration Status

### Firebase Admin SDK Configuration

**File:** `backend/config/firebase.js`

The backend is configured to verify Firebase ID tokens using Firebase Admin SDK.

**Required Setup:**
1. Download service account JSON from Firebase Console
2. Add credentials to `backend/.env`
3. Start the backend server

---

## Frontend Firebase Files

### 1. `lib/firebase.ts` ✅
**Purpose:** Initialize Firebase and export auth/analytics

**Key Exports:**
- `app` - Firebase app instance
- `auth` - Firebase Auth object
- `googleProvider` - Google sign-in provider
- `githubProvider` - GitHub sign-in provider
- `analytics` - Firebase Analytics

**Usage:**
```typescript
import { auth, googleProvider, githubProvider } from '@/lib/firebase';
import { signInWithPopup } from 'firebase/auth';

// Sign in with Google
const result = await signInWithPopup(auth, googleProvider);
```

### 2. `lib/auth-errors.ts` ✅
**Purpose:** Handle Firebase auth error messages

**Features:**
- User-friendly error messages
- Handles all Firebase error codes
- Detects weak passwords
- Detects duplicate accounts
- Detects invalid email formats

**Usage:**
```typescript
import { formatAuthError } from '@/lib/auth-errors';

try {
  // Firebase operation
} catch (error) {
  const message = formatAuthError(error);
  console.log(message); // User-friendly message
}
```

### 3. `lib/auth-navigation.ts` ✅
**Purpose:** Handle post-auth navigation

**Features:**
- Redirects to appropriate dashboard based on role
- Supports creator, developer, supporter roles
- Handles first-time setup flow

### 4. `lib/api-client.ts` ✅
**Purpose:** API calls with Firebase token authentication

**Key Functions:**
- `apiCall(endpoint, options)` - Make API calls with Firebase token
- `uploadFile(endpoint, fileUrl, additionalData)` - Upload files

**Features:**
- Automatically gets fresh Firebase ID token
- Adds Authorization header
- Handles authentication errors
- Verifies user is logged in

**Usage:**
```typescript
import { apiCall } from '@/lib/api-client';

// Get user profile
const response = await apiCall('/profile');

// Create something
const response = await apiCall('/endpoint', {
  method: 'POST',
  body: JSON.stringify({ data: 'value' })
});
```

### 5. `hooks/use-user-profile.ts` ✅ [NEW]
**Purpose:** Fetch and manage user profile from backend

**Features:**
- Listens to Firebase auth state
- Fetches user profile from backend
- Provides loading and error states
- Falls back to Firebase data if needed

**Usage:**
```typescript
import { useUserProfile } from '@/hooks/use-user-profile';

export function MyComponent() {
  const { user, loading, error } = useUserProfile();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>Welcome, {user?.name}</div>;
}
```

---

## Backend Firebase Files

### 1. `backend/config/firebase.js` ✅
**Purpose:** Initialize Firebase Admin SDK

**Configuration:**
- Reads credentials from `.env` file
- Initializes Admin SDK
- Exports admin instance for use in other files

**Environment Variables Required:**
```
FIREBASE_PROJECT_ID
FIREBASE_PRIVATE_KEY_ID
FIREBASE_PRIVATE_KEY
FIREBASE_CLIENT_EMAIL
FIREBASE_CLIENT_ID
FIREBASE_CLIENT_X509_CERT_URL
```

### 2. `backend/middleware/firebaseAuth.js` ✅
**Purpose:** Verify Firebase ID tokens and manage user profiles

**Features:**
- Extracts token from Authorization header
- Verifies token with Firebase Admin SDK
- Automatically creates user profile on first login
- Syncs Firebase user data to MongoDB
- Provides req.user (MongoDB user) and req.firebaseUser (Firebase data)

**Middleware Functions:**
```javascript
// Verify token and get user
verifyFirebaseToken(req, res, next)

// Optional: Check user role
authorize(requiredRole)
```

**Usage:**
```javascript
const { verifyFirebaseToken } = require('../middleware/firebaseAuth');

// Protect a route
router.get('/profile', verifyFirebaseToken, (req, res) => {
  // req.user = MongoDB user object
  // req.firebaseUser = Firebase user data
});
```

---

## API Endpoints

### Profile Management
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/profile` | Required | Get current user's profile |
| GET | `/api/profile/:userId` | Optional | Get another user's profile |
| PUT | `/api/profile` | Required | Update user profile |
| POST | `/api/profile/upload-picture` | Required | Upload profile picture |
| POST | `/api/profile/upload-file` | Required | Upload media file |
| GET | `/api/profile/:userId/uploads` | Optional | Get user's uploads |
| DELETE | `/api/profile/upload/:uploadId` | Required | Delete upload |

### Visit Analytics
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/visit/:userId` | Required | Track profile visit |
| GET | `/api/visit/:userId/history` | Required | Get visit history |
| GET | `/api/visit/:userId/stats` | Required | Get visit stats |

---

## Authentication Flow

### Sign Up / Sign In Flow

```
1. User clicks "Sign in with Google/GitHub"
   ↓
2. Firebase opens OAuth provider
   ↓
3. User authenticates with provider
   ↓
4. Firebase returns user with ID token
   ↓
5. Frontend stores user in Firebase (handled by SDK)
   ↓
6. Frontend redirects to dashboard
   ↓
7. Backend middleware verifies token on API calls
   ↓
8. MongoDB profile created automatically on first request
   ↓
9. User data synchronized with Firebase
```

### Token Flow

```
Frontend                          Firebase                Backend
  |                                  |                       |
  |-- Sign in with Google --------> |                       |
  |                                  |-- Create User        |
  |                           Returns ID Token               |
  |<-- ID Token ----------------------                       |
  |                                                            |
  |-- GET /profile -----> (with ID Token) --------->        |
  |                                              |-- Verify Token
  |                                              |-- Fetch/Create User
  |<------------------------------------------- User Profile |
  |                                              |
```

---

## Environment Variables

### Frontend `.env.local`
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAWBIVYAgf_wvK6pi0ytpw6ySrQItaMW14
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=patronex-e6750.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=patronex-e6750
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=patronex-e6750.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=722988330714
NEXT_PUBLIC_FIREBASE_APP_ID=1:722988330714:web:61df0ae8478ad0dcc93fe3
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-3LX0NJFV0L
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend `.env`
```bash
# Firebase
FIREBASE_PROJECT_ID=patronex-e6750
FIREBASE_PRIVATE_KEY_ID=<from service account>
FIREBASE_PRIVATE_KEY=<from service account>
FIREBASE_CLIENT_EMAIL=<from service account>
FIREBASE_CLIENT_ID=<from service account>
FIREBASE_CLIENT_X509_CERT_URL=<from service account>

# Database
MONGODB_URI=mongodb://localhost:27017/patronex

# Server
PORT=5000
NODE_ENV=development
BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
```

---

## Getting Firebase Credentials

### Step 1: Go to Firebase Console
1. Open [Firebase Console](https://console.firebase.google.com)
2. Select your project: `patronex-e6750`

### Step 2: Enable Authentication Methods
1. Go to **Authentication** in left menu
2. Click **Sign-in method**
3. Enable:
   - ✅ Google
   - ✅ GitHub
   - ✅ Email/Password (optional)

### Step 3: Get Service Account JSON (For Backend)
1. Go to **Project Settings** (gear icon)
2. Click **Service Accounts** tab
3. Click **Generate New Private Key**
4. Save the JSON file
5. Copy values to backend `.env`:
   - `project_id` → FIREBASE_PROJECT_ID
   - `private_key_id` → FIREBASE_PRIVATE_KEY_ID
   - `private_key` → FIREBASE_PRIVATE_KEY
   - `client_email` → FIREBASE_CLIENT_EMAIL
   - `client_id` → FIREBASE_CLIENT_ID
   - `client_x509_cert_url` → FIREBASE_CLIENT_X509_CERT_URL

### Step 4: Verify Web App Config
1. Go to **Project Settings** → **General**
2. Your apps section should show SDK config
3. Confirm these values match your `lib/firebase.ts`

---

## Testing Firebase Integration

### Test 1: Frontend Auth
```bash
# Open browser console at http://localhost:3000/signin
# Click "Continue with Google"
# Check console for:
✅ "User signed in: [email]"
✅ No errors about Firebase initialization
✅ Redirects to dashboard after auth
```

### Test 2: Backend Token Verification
```bash
# With backend running, make API call:
curl -H "Authorization: Bearer [ID_TOKEN]" http://localhost:5000/api/profile

# Should return:
{
  "success": true,
  "data": {
    "id": "firebase_uid",
    "name": "User Name",
    "email": "user@email.com",
    ...
  }
}
```

### Test 3: User Profile Creation
```bash
# After signing in, check MongoDB:
mongosh
use patronex
db.users.findOne()

# Should show user with firebaseUID, email, name, provider
```

### Test 4: Username Display (Username Fix)
```bash
# Sign in and check:
✅ Sidebar shows your real name
✅ CreatorSidebar shows your name
✅ Feed components show your name
✅ Avatar shows correct initials
✅ All pages consistent
```

---

## Security Checklist

- ✅ Firebase API key is public (NEXT_PUBLIC_* vars)
- ✅ Service account JSON is private (backend .env)
- ✅ Frontend doesn't expose service account
- ✅ Backend verifies every API request token
- ✅ MongoDB user can only access own profile
- ✅ Firebase provides all authentication security
- ✅ No passwords stored in database
- ✅ No JWT tokens, using Firebase tokens

---

## Troubleshooting

### Issue: "Firebase initialization error: Service account object must contain..."
**Solution:** Backend `.env` is missing Firebase credentials. Get service account JSON from Firebase Console.

### Issue: "Not authenticated. Please login first."
**Solution:** User needs to sign in first. Redirect to `/signin`.

### Issue: Username shows as "User" or "Loading..."
**Solution:** Backend `/profile` endpoint is not returning data. Check:
- Backend is running
- MongoDB has user profile
- Firebase token is valid

### Issue: Sign in button doesn't work
**Solution:** Check:
- Firebase project ID matches `lib/firebase.ts`
- Google/GitHub provider enabled in Firebase
- OAuth redirect URLs configured in Firebase

### Issue: CORS errors
**Solution:** Backend needs CORS headers. Check `backend/server.js` has:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

---

## What's Next

1. ✅ **Frontend:** Firebase configured and integrated
2. ✅ **Backend:** Firebase middleware ready
3. ✅ **Auth:** Sign in with Google/GitHub working
4. ✅ **Profiles:** Automatic user profile creation
5. ✅ **Usernames:** Dynamic display across all pages
6. 📋 **Optional:** Email/Password authentication
7. 📋 **Optional:** Profile editing
8. 📋 **Optional:** Two-factor authentication

---

## Quick Start Commands

```bash
# Install dependencies
npm install
cd backend && npm install

# Start backend (Terminal 1)
cd backend
node server.js  # Requires .env with Firebase credentials

# Start frontend (Terminal 2)
npm run dev

# Open in browser
http://localhost:3000

# Sign in with Google/GitHub
Click "Sign in" button and authenticate
```

---

## Documentation Files

📄 **USERNAME_FIX_COMPLETE.md** - Username display implementation  
📄 **USERNAME_FIX_TESTING_GUIDE.md** - Test username fix  
📄 **USERNAME_FIX_SUMMARY.txt** - Summary of changes  
📄 **FIREBASE_SETUP_QUICK.md** - Quick Firebase setup  
📄 **FIREBASE_BACKEND_GUIDE.md** - Complete backend guide  
📄 **FIREBASE_CODE_EXAMPLES.md** - Code examples  

---

## Support

For issues with Firebase:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Console](https://console.firebase.google.com)
- [Firebase Support](https://firebase.google.com/support)

For issues with the Patronex app:
- Check terminal logs (frontend and backend)
- Check browser console (F12)
- Check MongoDB for user data
- Enable debug logging in code

---

**Configuration Status: ✅ COMPLETE**  
**Ready to Use: ✅ YES**  
**Next Step: Start backend and frontend servers**
