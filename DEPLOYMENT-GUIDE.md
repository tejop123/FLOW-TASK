# 🚀 FlowTask Deployment Guide

## Complete Free Deployment in 20 Minutes!

---

## 📋 Prerequisites

- GitHub account (free)
- MongoDB Atlas account (already set up ✅)
- Vercel account (free - for frontend)
- Render account (free - for backend)

---

## Part 1: Prepare Your Code (5 minutes)

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click **"New Repository"**
3. Name: `flowtask`
4. Set to **Public** (required for free deployments)
5. Click **"Create Repository"**

### Step 2: Push Your Code to GitHub

Open PowerShell in your project folder:

```powershell
cd C:\Projects\hello

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - FlowTask app"

# Add your GitHub repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/flowtask.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Part 2: Deploy Backend to Render (7 minutes)

### Step 1: Sign Up for Render

1. Go to [Render.com](https://render.com)
2. Click **"Get Started for Free"**
3. Sign up with GitHub (easiest)

### Step 2: Create New Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `flowtask`
3. Select the repository

### Step 3: Configure Backend Service

Fill in these settings:

- **Name**: `flowtask-backend`
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Instance Type**: `Free`

### Step 4: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these 3 variables:

| Key | Value |
|-----|-------|
| `PORT` | `5000` |
| `MONGO_URI` | `mongodb+srv://uttkarshrajlalganj_db_user:j8LDpJzBaNqD09Ni@one.561j2vj.mongodb.net/flowtask?retryWrites=true&w=majority` |
| `JWT_SECRET` | `supersecretkey` |

### Step 5: Deploy

1. Click **"Create Web Service"**
2. Wait 3-5 minutes for deployment
3. You'll get a URL like: `https://flowtask-backend.onrender.com`

### Step 6: Test Backend

Visit: `https://flowtask-backend.onrender.com/` 
Should show: "FlowTask API is running..."

✅ **Backend Deployed!**

---

## Part 3: Deploy Frontend to Vercel (5 minutes)

### Step 1: Sign Up for Vercel

1. Go to [Vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Sign up with GitHub

### Step 2: Import Project

1. Click **"Add New..."** → **"Project"**
2. Select your GitHub repo: `flowtask`
3. Click **"Import"**

### Step 3: Configure Frontend

- **Framework Preset**: Vite (auto-detected)
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Step 4: Add Environment Variable

Click **"Environment Variables"**

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://flowtask-backend.onrender.com/api` |

**Important**: Replace with YOUR backend URL from Render!

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. You'll get a URL like: `https://flowtask-xyz123.vercel.app`

✅ **Frontend Deployed!**

---

## Part 4: Update Backend CORS (2 minutes)

### Update Backend to Allow Frontend

Edit `backend/server.js` - Update CORS:

```javascript
const corsOptions = {
  origin: [
    'http://localhost:3006',
    'https://flowtask-xyz123.vercel.app'  // Add your Vercel URL
  ],
  credentials: true
};

app.use(cors(corsOptions));
```

Push changes:

```powershell
git add .
git commit -m "Update CORS for production"
git push
```

Render will auto-redeploy (takes 2 minutes)

---

## Part 5: Update MongoDB Atlas (Already Done ✅)

Your IP is already whitelisted! But for production:

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. **Network Access** → **Edit**
3. Add `0.0.0.0/0` (allows all IPs)
4. Click **Confirm**

---

## 🎉 Your App is Live!

### URLs:

- **Frontend (Vercel)**: `https://flowtask-xyz123.vercel.app`
- **Backend (Render)**: `https://flowtask-backend.onrender.com`
- **Database**: MongoDB Atlas (already configured)

### Test It:

1. Open your Vercel URL
2. Click the suitcase 🧳
3. Try "Skip for now" or Register
4. Create projects and tasks
5. Everything should work!

---

## 🔧 Custom Domain (Optional)

### For Vercel Frontend:

1. Go to Vercel Dashboard → Your Project
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain (e.g., `flowtask.com`)
4. Follow DNS instructions

### For Render Backend:

1. Render Dashboard → Your Service
2. **Settings** → **Custom Domain**
3. Add domain (e.g., `api.flowtask.com`)

---

## 📊 Monitor Your App

### Render (Backend):

- **Dashboard**: See logs, metrics, restarts
- **Logs**: Real-time server logs
- **Free Tier**: App sleeps after 15 min of inactivity (wakes in 30 sec)

### Vercel (Frontend):

- **Analytics**: Page views, performance
- **Logs**: Deployment logs
- **Free Tier**: Unlimited bandwidth, 100GB per month

---

## 🐛 Troubleshooting

### Backend Issues:

**Problem**: "Application failed to start"
- Check environment variables are correct
- Check MongoDB connection string
- View logs in Render dashboard

**Problem**: Backend sleeps (free tier)
- First request takes 30 seconds to wake up
- Consider upgrading to paid tier ($7/month) for 24/7 uptime

### Frontend Issues:

**Problem**: Can't connect to backend
- Verify `VITE_API_URL` in Vercel environment variables
- Check CORS settings in backend
- Test backend URL directly

**Problem**: Build failed
- Check `npm run build` works locally
- Verify `package.json` scripts are correct

### MongoDB Issues:

**Problem**: Connection timeout
- Add `0.0.0.0/0` to Network Access
- Verify connection string has correct password
- Check database user exists

---

## 💰 Cost Breakdown

### Free Forever:

- **Vercel**: 
  - 100GB bandwidth/month
  - Unlimited deployments
  - Free SSL/HTTPS
  
- **Render**: 
  - 750 hours/month (enough for 1 app 24/7)
  - Auto-sleep after inactivity
  - 100GB bandwidth
  
- **MongoDB Atlas**:
  - 512MB storage
  - Shared cluster
  - Great for personal projects

### If You Need More (Optional):

- **Render Pro**: $7/month (no sleep, more resources)
- **Vercel Pro**: $20/month (team features, more bandwidth)
- **MongoDB M10**: $57/month (dedicated cluster, more storage)

---

## 🔄 Future Updates

### To Update Your App:

```powershell
# Make your changes
# Then push to GitHub:
git add .
git commit -m "Your update message"
git push

# Both Vercel and Render auto-deploy!
```

---

## 📝 Quick Commands Reference

```powershell
# Local Development
cd C:\Projects\hello\backend && node server.js
cd C:\Projects\hello\frontend && npm run dev

# Build Frontend
cd C:\Projects\hello\frontend && npm run build

# Test Production Build Locally
cd C:\Projects\hello\frontend && npm run preview

# Push Updates
git add .
git commit -m "Update message"
git push

# View Logs
# Render: Dashboard → Logs
# Vercel: Dashboard → Deployments → View Logs
```

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Render account created
- [ ] Backend deployed to Render
- [ ] Environment variables added to Render
- [ ] Backend URL working (test with browser)
- [ ] Vercel account created
- [ ] Frontend deployed to Vercel
- [ ] VITE_API_URL environment variable set
- [ ] Frontend URL working
- [ ] CORS updated with frontend URL
- [ ] MongoDB IP whitelist updated (0.0.0.0/0)
- [ ] Test registration/login
- [ ] Test guest mode
- [ ] Test creating tasks/projects

---

## 🆘 Need Help?

### Render Support:
- [Render Docs](https://render.com/docs)
- [Community Forum](https://community.render.com)

### Vercel Support:
- [Vercel Docs](https://vercel.com/docs)
- [Discord Community](https://vercel.com/discord)

### MongoDB Support:
- [MongoDB Docs](https://www.mongodb.com/docs/atlas/)
- [Community Forum](https://www.mongodb.com/community/forums/)

---

## 🎯 What's Next?

After deployment, consider:

1. **Add Analytics** - Google Analytics, Vercel Analytics
2. **Custom Domain** - Make it professional
3. **Email Notifications** - Task reminders
4. **Social Login** - Google, GitHub OAuth
5. **Mobile App** - React Native version
6. **API Rate Limiting** - Protect your backend
7. **Backups** - MongoDB Atlas automated backups

---

**Your app is ready for the world! 🌍**

Need help? Just ask! 😊
