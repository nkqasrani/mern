# DEPLOYMENT INSTRUCTIONS

## Quick Deploy Guide for Task Management System

### Prerequisites
1. GitHub account (✓ Already done)
2. Render account (for backend) - [Sign up](https://render.com)
3. Vercel account (for frontend) - [Sign up](https://vercel.com)
4. MongoDB Atlas account (for database) - [Sign up](https://www.mongodb.com/cloud/atlas)

---

## Step 1: Setup MongoDB Atlas (Database)

1. **Create Account & Cluster**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up and create a FREE cluster (M0)
   - Choose a region close to you

2. **Configure Database**
   - Click "Database Access" → "Add New Database User"
   - Username: `taskmanager`
   - Password: Click "Autogenerate" and **SAVE IT**
   - Set privileges: "Atlas admin"

3. **Configure Network Access**
   - Click "Network Access" → "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

4. **Get Connection String**
   - Click "Database" → "Connect" → "Connect your application"
   - Copy the connection string, it looks like:
   ```
   mongodb+srv://taskmanager:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - Replace `<password>` with your actual password
   - Add database name `taskmanagement` before the `?`:
   ```
   mongodb+srv://taskmanager:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/taskmanagement?retryWrites=true&w=majority
   ```
   - **SAVE THIS CONNECTION STRING** - you'll need it!

---

## Step 2: Deploy Backend to Render

1. **Sign Up/Login to Render**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New" → "Web Service"
   - Connect your GitHub repository: `nkqasrani/mern`
   - Click "Connect"

3. **Configure Service**
   - **Name**: `task-management-api` (or any name you prefer)
   - **Region**: Oregon (Free)
   - **Branch**: `master`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

4. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable" and add these:
   
   | Key | Value |
   |-----|-------|
   | `NODE_ENV` | `production` |
   | `MONGODB_URI` | Your MongoDB Atlas connection string from Step 1 |
   | `JWT_SECRET` | A random secure string (use a password generator) |
   | `JWT_EXPIRE` | `30d` |
   | `CLIENT_URL` | `https://yourdomain.vercel.app` (update after frontend deploy) |

5. **Create Web Service**
   - Click "Create Web Service"
   - Wait 3-5 minutes for deployment
   - **COPY YOUR BACKEND URL**: `https://task-management-api-xxxx.onrender.com`

6. **Test Backend**
   - Visit: `https://your-backend-url.onrender.com`
   - You should see: `{"success":true,"message":"Task Management API is running"}`

---

## Step 3: Deploy Frontend to Vercel

1. **Update Frontend Environment**
   - Before deploying, we need to set the backend URL
   - Your backend URL from Step 2: `https://task-management-api-xxxx.onrender.com`

2. **Sign Up/Login to Vercel**
   - Go to https://vercel.com
   - Sign up with GitHub

3. **Import Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository: `nkqasrani/mern`
   - Click "Import"

4. **Configure Project**
   - **Framework Preset**: `Create React App`
   - **Root Directory**: Click "Edit" → Select `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

5. **Add Environment Variable**
   - Click "Environment Variables"
   - Add:
     - **Key**: `REACT_APP_API_URL`
     - **Value**: `https://your-backend-url.onrender.com/api`
     - (Replace with your actual Render backend URL)

6. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - **COPY YOUR FRONTEND URL**: `https://your-app.vercel.app`

7. **Update Backend CLIENT_URL**
   - Go back to Render
   - Dashboard → Your service → Environment
   - Update `CLIENT_URL` to your Vercel frontend URL
   - Click "Save Changes" (this will redeploy)

---

## Step 4: Test Your Deployment

1. **Visit Your Frontend**: `https://your-app.vercel.app`
2. **Register a new account**
3. **Login and test features**:
   - Create a project
   - Add tasks
   - Update task status
   - Test all functionality

---

## Common Issues & Solutions

### Backend Issues

**Error: "Application failed to respond"**
- Check Render logs: Dashboard → Your service → Logs
- Verify MONGODB_URI is correct
- Ensure all environment variables are set

**Error: "MongoServerError: bad auth"**
- Database password is incorrect
- Regenerate password in MongoDB Atlas
- Update MONGODB_URI in Render

### Frontend Issues

**Error: "Network Error" or API calls fail**
- Check `REACT_APP_API_URL` in Vercel
- Ensure it ends with `/api`
- Verify backend is running (visit backend URL)

**Blank page after deployment**
- Check Vercel deployment logs
- Verify `Root Directory` is set to `frontend`
- Ensure build completed successfully

### CORS Issues
- Update `CLIENT_URL` in Render to match your Vercel URL
- Redeploy backend after updating

---

## Environment Variables Summary

### Backend (Render)
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://taskmanager:password@cluster0.xxxxx.mongodb.net/taskmanagement?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-random-string-here
JWT_EXPIRE=30d
CLIENT_URL=https://your-app.vercel.app
```

### Frontend (Vercel)
```
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

---

## Continuous Deployment

Both Render and Vercel are now connected to your GitHub repository!

**Automatic Updates:**
- Push changes to `master` branch
- Both services will automatically rebuild and redeploy
- No manual deployment needed!

---

## Useful Links

- **MongoDB Atlas**: https://cloud.mongodb.com
- **Render Dashboard**: https://dashboard.render.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Your Repository**: https://github.com/nkqasrani/mern

---

## Need Help?

1. Check deployment logs in Render/Vercel dashboards
2. Review MongoDB Atlas connection string
3. Verify all environment variables are set correctly
4. Ensure backend is responding before testing frontend

🎉 **Congratulations! Your MERN app is now live!**
