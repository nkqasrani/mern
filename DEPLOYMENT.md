# Deployment Guide
## Task Management System - MERN Stack

This guide provides step-by-step instructions to deploy your Task Management System to production.

---

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [MongoDB Atlas Setup](#mongodb-atlas-setup)
3. [Backend Deployment (Render)](#backend-deployment-render)
4. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
5. [Alternative Deployments](#alternative-deployments)
6. [Post-Deployment Testing](#post-deployment-testing)
7. [Troubleshooting](#troubleshooting)

---

## Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All code is committed to GitHub
- [ ] Application works correctly in local environment
- [ ] Environment variables are documented
- [ ] Database is properly set up
- [ ] API endpoints are tested
- [ ] Frontend builds without errors
- [ ] Security best practices are followed

---

## MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Sign Up" or "Try Free"
3. Create your account
4. Verify your email

### Step 2: Create a Cluster

1. Click "Build a Cluster"
2. Select **FREE** tier (M0 Sandbox)
3. Choose a cloud provider (AWS recommended)
4. Select a region (choose closest to your users)
5. Cluster Name: `TaskManagement` (or your preference)
6. Click "Create Cluster" (takes 3-5 minutes)

### Step 3: Configure Database Access

1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Authentication Method: Password
4. Username: `taskmanager` (or your choice)
5. Password: Click "Autogenerate Secure Password" (save this!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### Step 4: Configure Network Access

1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (0.0.0.0/0)
   - **Note**: For production, restrict to your server IPs
4. Click "Confirm"

### Step 5: Get Connection String

1. Click "Database" in left sidebar
2. Click "Connect" button on your cluster
3. Select "Connect your application"
4. Driver: Node.js, Version: 4.1 or later
5. Copy the connection string:
   ```
   mongodb+srv://taskmanager:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your database user password
7. Add database name before the `?`:
   ```
   mongodb+srv://taskmanager:yourpassword@cluster0.xxxxx.mongodb.net/taskmanagement?retryWrites=true&w=majority
   ```

---

## Backend Deployment (Render)

### Step 1: Prepare Backend

1. Ensure your `package.json` has proper scripts:
   ```json
   {
     "scripts": {
       "start": "node server.js",
       "dev": "nodemon server.js"
     }
   }
   ```

2. Create `.gitignore` if not exists:
   ```
   node_modules/
   .env
   *.log
   ```

3. Commit and push to GitHub

### Step 2: Create Render Account

1. Go to [Render](https://render.com)
2. Sign up with GitHub account
3. Authorize Render to access your repositories

### Step 3: Create Web Service

1. Click "New +" → "Web Service"
2. Connect your repository
3. Select your repository
4. Configure:
   - **Name**: `task-management-api` (or your choice)
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Step 4: Add Environment Variables

Click "Advanced" → "Add Environment Variable":

```
PORT=5000
MONGODB_URI=mongodb+srv://taskmanager:yourpassword@cluster0.xxxxx.mongodb.net/taskmanagement?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_min_32_characters_long_random_string
NODE_ENV=production
```

**Important**: Generate a strong JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 5: Deploy

1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Note your service URL: `https://task-management-api.onrender.com`

### Step 6: Verify Backend

Test the API:
```bash
curl https://task-management-api.onrender.com/api/auth/register
```

Expected response: Method not allowed or similar (proves server is running)

---

## Frontend Deployment (Vercel)

### Step 1: Update Frontend Configuration

1. Create `.env.production` in frontend folder:
   ```
   REACT_APP_API_URL=https://task-management-api.onrender.com/api
   ```

2. Update `package.json` if needed:
   ```json
   {
     "scripts": {
       "start": "react-scripts start",
       "build": "react-scripts build"
     }
   }
   ```

3. Test build locally:
   ```bash
   cd frontend
   npm run build
   ```

4. Commit changes to GitHub

### Step 2: Create Vercel Account

1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub
3. Authorize Vercel

### Step 3: Deploy Frontend

**Method 1: Dashboard**

1. Click "Add New Project"
2. Import your repository
3. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

4. Add Environment Variables:
   ```
   REACT_APP_API_URL=https://task-management-api.onrender.com/api
   ```

5. Click "Deploy"
6. Wait 2-3 minutes
7. Get your URL: `https://task-management-system.vercel.app`

**Method 2: CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend
cd frontend

# Deploy
vercel

# Follow prompts:
# Set up and deploy? Y
# Scope: Your account
# Link to existing project? N
# Project name: task-management-system
# Directory: ./ (current)
# Override settings? Y
# Build command: npm run build
# Output directory: build
# Development command: npm start

# For production:
vercel --prod
```

---

## Alternative Deployments

### Backend on Railway

1. Go to [Railway](https://railway.app)
2. Sign up with GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Select repository
5. Add environment variables
6. Deploy

### Backend on Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create task-management-api

# Add environment variables
heroku config:set MONGODB_URI=your_connection_string
heroku config:set JWT_SECRET=your_secret
heroku config:set NODE_ENV=production

# Deploy
cd backend
git push heroku main
```

### Frontend on Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Navigate to frontend
cd frontend

# Build
npm run build

# Deploy
netlify deploy

# For production
netlify deploy --prod
```

---

## Post-Deployment Testing

### Test Backend

1. **Health Check**
   ```bash
   curl https://task-management-api.onrender.com/api/auth/me
   ```
   Should return 401 Unauthorized (proves auth works)

2. **Register User**
   ```bash
   curl -X POST https://task-management-api.onrender.com/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
   ```

3. **Login**
   ```bash
   curl -X POST https://task-management-api.onrender.com/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

### Test Frontend

1. Visit your Vercel URL
2. Register a new account
3. Login with credentials
4. Create a project
5. Create a task
6. Test search and filters
7. Test on mobile device

### Integration Testing

1. Open browser console (F12)
2. Check for errors
3. Verify API calls in Network tab
4. Test all CRUD operations:
   - Create project ✓
   - View projects ✓
   - Update project ✓
   - Delete project ✓
   - Create task ✓
   - View tasks ✓
   - Update task ✓
   - Delete task ✓

---

## Troubleshooting

### Backend Issues

**Problem**: Backend won't start
- Check environment variables are set correctly
- Verify MongoDB connection string
- Check Render logs: Dashboard → Logs

**Problem**: CORS errors
- Ensure CORS is enabled in `server.js`
- Check frontend URL is allowed
- Add to backend:
  ```javascript
  app.use(cors({
    origin: 'https://task-management-system.vercel.app',
    credentials: true
  }));
  ```

**Problem**: 502 Bad Gateway
- Check if server is listening on correct PORT
- Verify `process.env.PORT` is used
- Check Render logs for errors

### Frontend Issues

**Problem**: API calls fail
- Verify `REACT_APP_API_URL` is set correctly
- Check browser console for errors
- Ensure backend URL includes `/api`

**Problem**: Build fails
- Check for syntax errors
- Verify all dependencies are in `package.json`
- Check Vercel build logs

**Problem**: Environment variables not working
- Ensure variables start with `REACT_APP_`
- Rebuild after changing variables
- Clear cache: `npm run build` locally first

### Database Issues

**Problem**: Cannot connect to MongoDB
- Verify IP whitelist in MongoDB Atlas
- Check connection string format
- Ensure password is URL-encoded if it contains special characters

**Problem**: Database slow
- Check if using Free tier (M0) - has limitations
- Add indexes to collections
- Optimize queries with `.select()` and `.lean()`

---

## Production Best Practices

### Security

1. **Never commit `.env` files**
2. **Use strong JWT secrets** (32+ characters)
3. **Enable HTTPS** (automatic on Vercel/Render)
4. **Validate all inputs** server-side
5. **Rate limiting** for API endpoints
6. **Sanitize user inputs**

### Performance

1. **Enable gzip compression**
2. **Use MongoDB indexes**
3. **Implement caching** (Redis)
4. **Optimize images** and assets
5. **Lazy load** components
6. **Code splitting** in React

### Monitoring

1. **Set up error tracking** (Sentry)
2. **Monitor uptime** (UptimeRobot)
3. **Check logs regularly**
4. **Set up alerts** for errors
5. **Monitor database** performance

### Backup

1. **Enable MongoDB automated backups**
2. **Export data regularly**
3. **Version control** everything
4. **Document changes**

---

## Maintenance

### Regular Tasks

- [ ] Check error logs weekly
- [ ] Review database performance
- [ ] Update dependencies monthly
- [ ] Test backup restoration quarterly
- [ ] Review security practices

### Updating the Application

```bash
# Make changes locally
git add .
git commit -m "Update: description"
git push origin main

# Render and Vercel will auto-deploy
```

---

## Support Resources

- **MongoDB Atlas**: https://docs.atlas.mongodb.com/
- **Render**: https://render.com/docs
- **Vercel**: https://vercel.com/docs
- **Express.js**: https://expressjs.com/
- **React**: https://react.dev/

---

**Deployment Complete! 🎉**

Your Task Management System is now live and ready to use.

- **Frontend**: https://task-management-system.vercel.app
- **Backend**: https://task-management-api.onrender.com
- **Database**: MongoDB Atlas

Remember to share the URLs with your team and enjoy your deployed application!
