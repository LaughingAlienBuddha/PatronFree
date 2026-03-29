# Production Deployment Guide

Deploy the Patronex backend to production using Render or Railway.

## 🚀 Deploy to Render (Recommended)

### Prerequisites
- GitHub account with pushed code
- Render account (free at render.com)

### Steps

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Add production backend"
   git push origin main
   ```

2. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

3. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repo
   - Choose the backend folder

4. **Configure Build Settings**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Runtime: Node
   - Node Version: 18

5. **Set Environment Variables**
   - Go to Environment tab
   - Add all variables from `.env.example`:
   ```
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your_production_secret_key
   JWT_EXPIRE=7d
   PORT=5000
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-url.com
   ```

6. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)
   - Note the provided URL

### Update Frontend
```env
NEXT_PUBLIC_API_URL=https://your-render-backend-url.com/api
```

---

## 🚀 Deploy to Railway

### Steps

1. **Install Railway CLI**
   ```bash
   npm i -g @railway/cli
   ```

2. **Login**
   ```bash
   railway login
   ```

3. **Initialize Project**
   ```bash
   railway init
   ```

4. **Add MongoDB**
   ```bash
   railway add
   # Select MongoDB
   ```

5. **Set Environment Variables**
   ```bash
   railway variables set MONGODB_URI="mongodb+srv://..."
   railway variables set JWT_SECRET="your_secret"
   railway variables set FRONTEND_URL="https://your-frontend.com"
   ```

6. **Deploy**
   ```bash
   railway up
   ```

---

## 🗄️ MongoDB Atlas Setup (Production Database)

1. **Create Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up

2. **Create Project**
   - New Project → Name it "patronex"

3. **Create Cluster**
   - Select "Shared" (free tier)
   - Choose region close to your users
   - Click "Create"

4. **Create Database User**
   - Go to Database Access
   - Add Database User
   - Username: patronex_user
   - Generate password (save it!)
   - Add IP whitelist (or allow all: 0.0.0.0/0)

5. **Get Connection String**
   - Go to Databases → Connect
   - Choose "Drivers"
   - Copy connection string
   - Replace username and password
   - Replace "myFirstDatabase" with "patronex"

Example:
```
mongodb+srv://patronex_user:PASSWORD@cluster.mongodb.net/patronex?retryWrites=true&w=majority
```

6. **Add to .env**
   ```env
   MONGODB_URI=mongodb+srv://patronex_user:YOUR_PASSWORD@cluster.mongodb.net/patronex
   ```

---

## 🔒 Security Checklist

- [ ] Change JWT_SECRET to strong random string
- [ ] Use strong MongoDB password
- [ ] Enable IP whitelist in MongoDB Atlas
- [ ] Set NODE_ENV=production
- [ ] Use HTTPS URLs
- [ ] Enable CORS only for your domain
- [ ] Use rate limiting (already enabled)
- [ ] Set appropriate file size limits
- [ ] Regular backups enabled
- [ ] Monitor error logs

---

## 📊 Production Monitoring

### Monitor Backend Health
```bash
curl https://your-backend-url.com/api/health
```

### Monitor Logs
- **Render**: Dashboard → Logs
- **Railway**: `railway logs`

### Monitor Database
- **MongoDB Atlas**: Monitoring tab

### Monitor Performance
- **Render**: Analytics tab
- **Railway**: Analytics tab

---

## 🔄 Update Backend in Production

### Render
```bash
git push origin main
# Render auto-deploys on push
```

### Railway
```bash
railway up
```

---

## 💾 Backup MongoDB

### Monthly Backup (Automated in Atlas)
- Go to MongoDB Atlas
- Backup tab → Enable backup

### Manual Backup
```bash
mongodump --uri "mongodb+srv://..." --out ./backup
```

---

## 🐛 Production Debugging

### Check Backend Logs
- Render: Dashboard → Logs
- Railway: `railway logs -t backend`

### Check MongoDB
- Atlas: Activity Monitor tab
- Connection health: Databases → Connect → Status

### Common Production Issues

**Issue: Connection Timeout**
- Check IP whitelist in MongoDB Atlas
- Verify JWT_SECRET matches frontend

**Issue: File Upload Failed**
- Check file size limit
- Verify MIME types allowed
- Check disk space

**Issue: High Response Time**
- Add MongoDB indexes
- Enable caching
- Monitor database performance

---

## 📈 Performance Optimization

### Database Optimization
```javascript
// In MongoDB Atlas: Indexes tab
// Create indexes on frequently queried fields
db.users.createIndex({ email: 1 })
db.visits.createIndex({ profileUserId: 1, createdAt: -1 })
```

### Code Optimization
- Use lean() for read-only queries
- Implement caching
- Optimize file sizes

### API Rate Limiting
Already configured in server.js:
- 100 requests per 15 minutes per IP
- 5 login attempts per 15 minutes per IP

---

## 🔔 Alerts & Notifications

### Render
- Settings → Notifications → Email alerts for failures

### Railway
- Go to project → Alerts
- Set up error notifications

### MongoDB
- Atlas → Alerts → Configure alerts for:
  - Connection failures
  - High memory usage
  - Slow queries

---

## 📋 Checklist for Production

- [ ] MongoDB Atlas configured
- [ ] Connection string in production env
- [ ] JWT_SECRET is strong
- [ ] FRONTEND_URL set correctly
- [ ] CORS configured for frontend domain
- [ ] Rate limiting enabled
- [ ] Error handling tested
- [ ] File upload limits set
- [ ] Backup strategy in place
- [ ] Monitoring set up
- [ ] Team knows deployment process
- [ ] Rollback plan in place

---

## 🆘 Emergency Procedures

### Rollback to Previous Version
```bash
# Render: Click "Manual Deployment" → Select previous version
# Railway: railway down && railway up
```

### Restore from Backup
```bash
mongorestore --uri "mongodb+srv://..." ./backup
```

### Reset Database (⚠️ Destructive)
```bash
# MongoDB Atlas: Cluster → Delete Cluster
# Create new cluster and redeploy
```

---

## 📞 Support

- **Render Support**: render.com/support
- **Railway Support**: railway.app/support
- **MongoDB Support**: mongodb.com/support

---

**You're now production-ready! 🎉**
