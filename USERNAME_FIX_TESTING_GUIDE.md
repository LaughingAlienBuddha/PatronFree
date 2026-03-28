# How to Test the Username Fix

## Prerequisites
- ✅ Firebase project configured
- ✅ Backend running on port 5000
- ✅ Frontend running on port 3000
- ✅ MongoDB available

## Step-by-Step Testing

### 1. Start the Backend Server
```bash
cd /Users/mayankdubey/Downloads/next/backend
npm install  # If not already done
node server.js
# Should see: Server running on port 5000
```

### 2. Start the Frontend Server  
```bash
cd /Users/mayankdubey/Downloads/next
npm run dev
# Should see: Ready on http://localhost:3000
```

### 3. Sign In
1. Go to http://localhost:3000/signin
2. Click "Continue with Google" or "Continue with GitHub"
3. Complete Firebase authentication
4. Should redirect to `/dashboard`

### 4. Verify Username on Dashboard
**Location:** Sidebar (bottom left)
- Should show your real name (from Firebase)
- Should show your email
- Avatar should have correct initials

**Example:**
```
[Avatar with US initials]
User Singh
user@example.com
```

### 5. Check CreatorSidebar
**Location:** Left sidebar (creator dashboard)
1. Go to http://localhost:3000/creator
2. Look at profile card at top of sidebar
3. Should show:
   - Your real name
   - Profile picture (if set)
   - "Creator" badge
   - Your email

### 6. Verify Feed Components
**Location:** Feed page
1. Go to http://localhost:3000/dashboard/explore (or any feed)
2. Check FeedTopBar (top right avatar)
   - Should show your profile picture
   - Avatar initials should match your name
3. Check FeedComposer (compose box at top)
   - Avatar should be yours
   - Initials should be correct
4. Check FeedSidebar (left panel)
   - Profile section should show your name
   - Email should be displayed
   - Avatar should match

### 7. Test Across All Pages
The username should be consistent on:
- [ ] `/dashboard` - Sidebar
- [ ] `/creator` - CreatorSidebar
- [ ] `/creator/content` - CreatorSidebar
- [ ] `/creator/audience` - CreatorSidebar
- [ ] `/dashboard/explore` - All feed components
- [ ] Profile pages - TopBar avatar

## What to Look For

✅ **Correct behavior:**
- Name matches your Firebase auth displayName
- Email matches your Firebase auth email
- Avatar initials are first letters of your name
- All pages show same username
- No hardcoded names visible

❌ **Wrong behavior:**
- Shows "Aarav Mehta" (old hardcoded name)
- Shows "DevX Team" (old hardcoded name)
- Shows "Loading..." for too long
- Shows "User" as fallback (means backend profile missing)
- Different names on different pages

## Backend Requirements

The backend's `GET /profile` endpoint must return:
```json
{
  "success": true,
  "data": {
    "id": "firebase_uid",
    "name": "User Name",
    "email": "user@example.com",
    "profilePic": "https://...",
    "username": "optional_username",
    "bio": "optional_bio",
    "provider": "google|github|email"
  }
}
```

## Debugging

### Check Browser Console
```javascript
// Should see auth state changes and profile fetches
console.log("User profile:", user);
```

### Check Network Tab
1. Open DevTools (F12)
2. Go to Network tab
3. Sign in again
4. Should see:
   - Firebase auth requests
   - `GET /profile` request to backend
   - Response with user data

### Backend Logs
```bash
# Should see in backend console:
GET /profile 200
User profile fetched: { name: "...", email: "..." }
```

## Reset State

If having issues, try:
1. Hard refresh browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
2. Clear browser cache
3. Sign out and sign back in
4. Check MongoDB to ensure user profile exists

```bash
# Check MongoDB
mongosh
use patronex
db.users.findOne()  # Should show your user
```

## Common Issues

| Issue | Solution |
|-------|----------|
| Shows "Loading..." | Backend `/profile` endpoint is slow or failing |
| Shows "User" as name | User profile not created in MongoDB |
| Shows old name | Browser cache, need hard refresh |
| Avatar shows initials "US" | User object is null/undefined |
| "Cannot find name 'User'" errors | Need to rebuild (npm run dev) |

## Success Checklist

- [ ] Name shows on Dashboard Sidebar
- [ ] Name shows on Creator Sidebar
- [ ] Name shows on Feed Composer
- [ ] Name shows on Feed TopBar
- [ ] Avatar initials are correct
- [ ] Email displays correctly
- [ ] No console errors about missing functions
- [ ] All pages show same username
- [ ] Username persists after page refresh

## Next Steps

Once verified working:
1. Deploy backend to production
2. Update Firebase security rules
3. Test with multiple user accounts
4. Monitor user profile sync performance
5. Add real-time profile updates (optional)
