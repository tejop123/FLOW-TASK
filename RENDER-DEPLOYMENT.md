# Render Deployment Guide

## Deploy Backend to Render

1. **Go to Render Dashboard:** https://dashboard.render.com

2. **Create New Web Service:**
   - Click "New +" → "Web Service"
   - Connect GitHub repository: `https://github.com/tejop123/FLOW-TASK`
   - Select repository
   - Set name: `flowtask-backend`
   - Root directory: `backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Add Environment Variables:**
   - Click "Environment"
   - Add these variables:
     ```
     MONGO_URI = mongodb+srv://flowtask:flow@cluster0.nllycgv.mongodb.net/
     JWT_SECRET = supersecretkey
     NODE_ENV = production
     ```

4. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment to complete (~2-3 minutes)
   - Your backend URL will be: `https://flowtask-backend.onrender.com`

## Frontend Already Connected

- Frontend URL: **https://frontend-psi-lime-88.vercel.app**
- Backend URL: **https://flowtask-backend.onrender.com**
- Frontend is already configured to connect to Render backend

## Verify Connection

1. Visit: https://frontend-psi-lime-88.vercel.app
2. Open browser DevTools (F12) → Console
3. Look for API logs - should show calls to `flowtask-backend.onrender.com`
4. Register/Login should work if MongoDB is accessible

## MongoDB Atlas Setup

If you get MongoDB connection errors:
1. Go to: https://cloud.mongodb.com
2. Select your cluster → Network Access
3. Add Render's IP range: `0.0.0.0/0` (for testing)
   - Or use: https://docs.render.com/docs/outbound-static-ip-addresses

## Quick Commands

```bash
# Deploy backend to Render
git push origin main  # Render auto-deploys from GitHub

# Test backend is running
curl https://flowtask-backend.onrender.com/health

# Check backend logs on Render dashboard
```
