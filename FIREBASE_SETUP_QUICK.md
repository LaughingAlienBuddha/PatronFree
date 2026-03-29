# 🚀 Firebase Backend - Quick Setup (5 Minutes)

## Step 1: Get Firebase Service Account (1 min)

1. Open [Firebase Console](https://console.firebase.google.com)
2. Click your project
3. Settings ⚙️ → Service Accounts
4. Generate New Private Key (copy this!)

## Step 2: Add to Backend Config (1 min)

```bash
cd backend
nano .env
```

Paste your service account details:

```env
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_ID=xxxxx
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nxxxxx\n-----END PRIVATE KEY-----\n
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@iam.gserviceaccount.com
FIREBASE_CLIENT_ID=xxxxx
FIREBASE_CLIENT_X509_CERT_URL=xxxxx

MONGODB_URI=mongodb://localhost:27017/patronex
PORT=5000
FRONTEND_URL=http://localhost:3000
```

## Step 3: Install & Run (1 min)

```bash
npm install
npm run dev
```

Should see:
```
✅ Firebase Admin SDK initialized
🚀 Server running on http://localhost:5000
```

## Step 4: Test It! (2 min)

### Login in Frontend
```
1. Go to http://localhost:3000/signin
2. Click "Sign in with Google"
3. Select account
```

### Check Backend
In browser console:
```javascript
const token = await auth.currentUser.getIdToken();
fetch('http://localhost:5000/api/profile', {
  headers: { 'Authorization': `Bearer ${token}` }
}).then(r => r.json()).then(console.log)
```

Should see your profile! ✅

---

## What Just Happened?

1. **Frontend:** Firebase handled login (Google/GitHub/Email)
2. **Backend:** Verified the token using Firebase Admin SDK
3. **Database:** Created your user profile automatically
4. **Sync:** Your name & photo from Firebase synced to MongoDB

## API Quick Reference

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/profile` | Get your profile |
| GET | `/api/profile/:userId` | Get someone's profile |
| PUT | `/api/profile` | Update bio/role |
| POST | `/api/profile/upload-picture` | Update profile pic |
| POST | `/api/profile/upload-file` | Upload file |
| POST | `/api/visit/:userId` | Track visit |
| GET | `/api/visit/:userId/stats` | Get visit stats |

All require `Authorization: Bearer <idToken>` header!

## Common Mistakes ❌

- **Forgot to copy private key correctly?** → Make sure it's one line with `\n`
- **Still getting "Not authenticated"?** → ID tokens expire hourly, get fresh one
- **Profile not showing?** → Check MongoDB is running
- **CORS error?** → Update `FRONTEND_URL` in `.env`

## Next Steps

1. ✅ Backend running with Firebase
2. ✅ Users auto-creating profiles  
3. 📖 Read `FIREBASE_BACKEND_GUIDE.md` for advanced features
4. 🔧 Update frontend components to use the API
5. 📤 Deploy to production

**Done! Your Firebase backend is live! 🎉**
