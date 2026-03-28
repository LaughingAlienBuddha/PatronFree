# ✅ Firebase Backend - Setup Checklist

## Pre-Setup (Before You Start)

- [ ] You have a Firebase project created
- [ ] You have Node.js 14+ installed (`node --version`)
- [ ] You have npm installed (`npm --version`)
- [ ] You have MongoDB running (local or Atlas)
- [ ] Backend folder exists at `/Users/mayankdubey/Downloads/next/backend`

---

## Step 1: Get Firebase Service Account (2 min)

- [ ] Go to [Firebase Console](https://console.firebase.google.com)
- [ ] Select your project
- [ ] Click **⚙️ Project Settings** (top left)
- [ ] Go to **Service Accounts** tab
- [ ] Click **Generate New Private Key**
- [ ] Save the JSON file (keep it safe!)
- [ ] Note all the values you'll need

---

## Step 2: Configure Backend (3 min)

```bash
cd /Users/mayankdubey/Downloads/next/backend
```

- [ ] Run: `cp .env.example .env`
- [ ] Open `.env` in your editor
- [ ] Add Firebase credentials:
  - [ ] FIREBASE_PROJECT_ID=`project_id` (from JSON)
  - [ ] FIREBASE_PRIVATE_KEY_ID=`private_key_id` (from JSON)
  - [ ] FIREBASE_PRIVATE_KEY=`"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"` (from JSON, convert to single line)
  - [ ] FIREBASE_CLIENT_EMAIL=`client_email` (from JSON)
  - [ ] FIREBASE_CLIENT_ID=`client_id` (from JSON)
  - [ ] FIREBASE_CLIENT_X509_CERT_URL=`client_x509_cert_url` (from JSON)
- [ ] Add MongoDB:
  - [ ] MONGODB_URI=`mongodb://localhost:27017/patronex` (local) OR `mongodb+srv://...` (Atlas)
- [ ] Add other config:
  - [ ] PORT=`5000`
  - [ ] FRONTEND_URL=`http://localhost:3000`

---

## Step 3: Install Dependencies (2 min)

```bash
npm install
```

- [ ] Command completes without errors
- [ ] `node_modules` folder created
- [ ] Check console output for any warnings

---

## Step 4: Start Backend (1 min)

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

- [ ] Server starts successfully
- [ ] No connection errors
- [ ] Port 5000 is available
- [ ] Keep this terminal open

---

## Step 5: Test Backend (3 min)

Open a new terminal:

```bash
# Test health check
curl http://localhost:5000/api/health

# Should return:
# {"success":true,"message":"Backend is running with Firebase Auth ✅"}
```

- [ ] Health check returns success

### Test with Frontend

In your browser (after logging in):

```javascript
// Open console (F12)
const token = await auth.currentUser.getIdToken();
fetch('http://localhost:5000/api/profile', {
  headers: { 'Authorization': `Bearer ${token}` }
}).then(r => r.json()).then(console.log)
```

- [ ] Returns user profile
- [ ] Profile has your Firebase data
- [ ] No authentication errors

---

## Step 6: Verify Database (2 min)

Check MongoDB for created user:

### If using Local MongoDB:
```bash
mongosh
use patronex
db.users.find()
```

### If using MongoDB Atlas:
- [ ] Go to MongoDB Atlas dashboard
- [ ] Select your cluster
- [ ] Click "Browse Collections"
- [ ] Should see `patronex` database
- [ ] Should see `users` collection
- [ ] Should see your user profile

---

## Frontend Integration Checklist

- [ ] `lib/api-client.ts` imports `auth` from `lib/firebase`
- [ ] `app/signin/page.tsx` uses `apiCall` for API requests (if email/password)
- [ ] `app/signup/page.tsx` uses `apiCall` for API requests (if email/password)
- [ ] Google/GitHub OAuth popups working
- [ ] After login, user can access `/dashboard`
- [ ] `/dashboard` can fetch `/api/profile` successfully

---

## Testing All Endpoints (10 min)

Each of these should return `success: true`:

### Profile Endpoints

```bash
# Get current profile
curl -H "Authorization: Bearer <TOKEN>" \
  http://localhost:5000/api/profile

# Get public profile (replace :userId)
curl -H "Authorization: Bearer <TOKEN>" \
  http://localhost:5000/api/profile/:userId

# Update profile
curl -X PUT \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"bio":"Hello world","role":"creator"}' \
  http://localhost:5000/api/profile

# Upload file
curl -X POST \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"fileUrl":"https://...","fileName":"file.jpg","fileType":"image"}' \
  http://localhost:5000/api/profile/upload-file
```

- [ ] GET /api/profile (own)
- [ ] GET /api/profile/:userId (someone else's)
- [ ] PUT /api/profile (update)
- [ ] POST /api/profile/upload-picture
- [ ] POST /api/profile/upload-file
- [ ] GET /api/profile/:userId/uploads
- [ ] DELETE /api/profile/upload/:uploadId

### Visit Endpoints

```bash
# Track visit
curl -X POST \
  -H "Authorization: Bearer <TOKEN>" \
  http://localhost:5000/api/visit/:userId

# Get visit history (your own)
curl -H "Authorization: Bearer <TOKEN>" \
  http://localhost:5000/api/visit/:userId/history

# Get visit stats (your own)
curl -H "Authorization: Bearer <TOKEN>" \
  http://localhost:5000/api/visit/:userId/stats
```

- [ ] POST /api/visit/:userId
- [ ] GET /api/visit/:userId/history
- [ ] GET /api/visit/:userId/stats

---

## Common Issues & Fixes

### ❌ "Cannot find module 'firebase-admin'"
**Fix:** Run `npm install` in backend folder

### ❌ "EADDRINUSE :::5000"
**Fix:** Port 5000 is in use. Either:
- Change PORT in .env to 5001
- Kill process: `lsof -ti:5000 | xargs kill -9`

### ❌ "Invalid token" Error
**Fix:** Token expired. In frontend console:
```javascript
const token = await auth.currentUser.getIdToken(true);
// Use this fresh token
```

### ❌ "MongoDB connection failed"
**Fix:** 
- Local: Run `mongod` first
- Atlas: Check connection string and IP whitelist

### ❌ "CORS error"
**Fix:** Update FRONTEND_URL in `.env` to match your frontend domain

### ❌ "Firebase initialization failed"
**Fix:** Check `.env` - private key should be on ONE line with `\n` for newlines

### ❌ "User not found in database"
**Fix:** Make any API request after login to trigger auto-creation

---

## Environment Variables Verification

```bash
# In backend folder
cat .env | grep FIREBASE_
cat .env | grep MONGODB_
cat .env | grep PORT
```

Should show:
```
FIREBASE_PROJECT_ID=xxx
FIREBASE_PRIVATE_KEY_ID=xxx
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY..."
FIREBASE_CLIENT_EMAIL=xxx
FIREBASE_CLIENT_ID=xxx
FIREBASE_CLIENT_X509_CERT_URL=xxx
MONGODB_URI=mongodb://...
PORT=5000
```

---

## Production Deployment Checklist

### Before Deploying

- [ ] Test all endpoints locally
- [ ] No console errors
- [ ] Database connection stable
- [ ] Environment variables set correctly
- [ ] Git repository initialized
- [ ] `.env` added to `.gitignore`
- [ ] Code committed to git

### Deployment (Render Example)

- [ ] Create account on [Render.com](https://render.com)
- [ ] Connect GitHub repository
- [ ] Create new Web Service
- [ ] Set build command: `npm install`
- [ ] Set start command: `npm start`
- [ ] Add environment variables (from `.env`)
- [ ] Deploy
- [ ] Check logs for errors
- [ ] Test health endpoint

### Post-Deployment

- [ ] Update `NEXT_PUBLIC_API_URL` in frontend `.env.local`
- [ ] Test frontend → backend connection
- [ ] Verify authentication works
- [ ] Check file uploads
- [ ] Monitor error logs
- [ ] Set up alerts if available

---

## Documentation Reference

| Document | Purpose | When to Read |
|----------|---------|-------------|
| START_HERE.md | Overview | First |
| FIREBASE_SETUP_QUICK.md | Quick setup | Now |
| FIREBASE_BACKEND_GUIDE.md | Complete guide | After setup |
| FIREBASE_CODE_EXAMPLES.md | Frontend code | When integrating |
| FIREBASE_IMPLEMENTATION_SUMMARY.md | What changed | For understanding |
| backend/README.md | API docs | For reference |

---

## Success Indicators

✅ **Backend Setup Complete When:**
- [ ] `npm run dev` shows no errors
- [ ] Firebase initialized message appears
- [ ] MongoDB connected message appears
- [ ] Health check endpoint works
- [ ] Can get profile after Firebase login

✅ **Integration Complete When:**
- [ ] Frontend can login with Google/GitHub
- [ ] API calls include Firebase token automatically
- [ ] Profile data loads in dashboard
- [ ] File uploads work
- [ ] Visit tracking works

✅ **Production Ready When:**
- [ ] All endpoints tested
- [ ] All errors handled gracefully
- [ ] Environment variables set
- [ ] Database backups configured
- [ ] Monitoring set up
- [ ] Team trained on deployment

---

## Quick Commands Reference

```bash
# Development
cd backend
npm run dev          # Start backend with auto-reload

# Testing
curl http://localhost:5000/api/health

# Database (MongoDB Atlas web)
mongosh "mongodb+srv://..."

# Deployment (Render)
git push origin main  # Auto-deploys

# Logs
pm2 logs            # If using PM2
railway logs        # If using Railway
```

---

## Support Resources

1. **Firebase Docs**: [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
2. **MongoDB Docs**: [Mongoose](https://mongoosejs.com)
3. **Express Docs**: [Express.js](https://expressjs.com)
4. **Your Guides**: All in this folder ⬆️

---

## Final Checklist

- [ ] Firebase backend setup complete
- [ ] All endpoints tested
- [ ] Frontend integration works
- [ ] Authentication flow working
- [ ] File uploads functional
- [ ] Analytics tracking
- [ ] Deployment plan ready
- [ ] Team trained
- [ ] Documentation reviewed

---

**🎉 You're all set! Your Firebase backend is ready to go!**

**Next step:** Read `FIREBASE_BACKEND_GUIDE.md` for complete reference

**Questions?** Check `FIREBASE_CODE_EXAMPLES.md` for implementation patterns
