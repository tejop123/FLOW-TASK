# FlowTask Troubleshooting Guide

## ❌ Current Issue: Account Creation Not Working

### Problem
When trying to register/create an account, nothing happens because the **MongoDB connection is failing**.

### Root Cause
Your MongoDB Atlas cluster has **IP whitelist restrictions**. Your current IP address is not allowed to connect to the database.

---

## 🔧 Solution Options

### Option 1: Fix MongoDB Atlas IP Whitelist (RECOMMENDED)

1. **Go to MongoDB Atlas**: https://cloud.mongodb.com/
2. **Login** with your credentials
3. **Navigate to**: Network Access (in the Security section on the left sidebar)
4. **Click**: "Add IP Address"
5. **Choose** one of:
   - **Add Current IP Address** (for your current network only)
   - **Allow Access from Anywhere** (0.0.0.0/0) - easier but less secure

6. **Save** and wait 1-2 minutes for changes to apply

7. **Restart the backend server**:
   ```powershell
   cd C:\Projects\hello\backend
   node server.js
   ```

You should see: `✅ MongoDB Connected Successfully`

---

### Option 2: Use Local MongoDB

If you have MongoDB installed locally:

1. **Open** `C:\Projects\hello\backend\.env`

2. **Replace** the MONGO_URI line with:
   ```
   MONGO_URI=mongodb://localhost:27017/flowtask
   ```

3. **Start MongoDB** service:
   ```powershell
   net start MongoDB
   ```

4. **Restart backend server**:
   ```powershell
   cd C:\Projects\hello\backend
   node server.js
   ```

---

### Option 3: Install MongoDB Locally (if not installed)

1. **Download MongoDB**: https://www.mongodb.com/try/download/community

2. **Install** MongoDB Community Server

3. **Follow Option 2** above

---

## 📊 How to Verify It's Working

### 1. Check Backend Logs
When you start the backend, you should see:
```
Connecting to MongoDB...
✅ MongoDB Connected Successfully
Server running on port 5000
```

### 2. Test Registration
Open browser to `http://localhost:3006` and try to register:
- If you see an error message in the form, check browser console (F12)
- If registration succeeds, you'll be redirected to the dashboard

### 3. Check Browser Console
Open Developer Tools (F12) → Console tab
- ❌ If you see network errors (500, connection refused): MongoDB is not connected
- ✅ If you see successful responses: Everything is working!

---

## 🚀 Quick Start (After Fixing MongoDB)

1. **Terminal 1 - Backend**:
   ```powershell
   cd C:\Projects\hello\backend
   node server.js
   ```
   Wait for: `✅ MongoDB Connected Successfully`

2. **Terminal 2 - Frontend**:
   ```powershell
   cd C:\Projects\hello\frontend
   npm run dev
   ```

3. **Open Browser**: http://localhost:3006

4. **Register** a new account

5. **Start using** FlowTask! 🎉

---

## 🆘 Still Not Working?

### Check These:

1. **Backend Running?**
   ```powershell
   curl http://localhost:5000
   ```
   Should return: "FlowTask API is running..."

2. **Frontend Running?**
   Open: http://localhost:3006
   Should show login page

3. **MongoDB Connected?**
   Check backend terminal for `✅ MongoDB Connected Successfully`

4. **Browser Console Errors?**
   Press F12, check Console and Network tabs

---

## 📝 Common Errors

### Error: "Cannot connect to MongoDB"
- **Fix**: Check MongoDB Atlas IP whitelist (Option 1 above)

### Error: "Port already in use"
- **Fix**: Kill existing node processes:
  ```powershell
  Get-Process node | Stop-Process -Force
  ```

### Error: "Failed to create account"
- **Fix**: Check backend terminal - if no MongoDB connection, see Option 1

### Error: Network request failed
- **Fix**: Make sure backend is running on port 5000

---

## ✅ Success Checklist

- [ ] MongoDB Atlas IP whitelisted OR local MongoDB running
- [ ] Backend shows `✅ MongoDB Connected Successfully`
- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:3006
- [ ] Can register new account
- [ ] Can create projects
- [ ] Can create tasks
- [ ] Can drag and drop tasks

---

**Need more help?** Check the main README.md file for detailed setup instructions.
