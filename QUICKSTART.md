# Quick Start Guide
## Task Management System

Get your Task Management System up and running in 5 minutes!

---

## Prerequisites

Make sure you have installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (v4.4 or higher)
- [Git](https://git-scm.com/)

Check your installations:
```bash
node --version
npm --version
mongod --version
git --version
```

---

## Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd task-management-system
```

---

## Step 2: Backend Setup

### Install Dependencies
```bash
cd backend
npm install
```

### Configure Environment Variables
Create a `.env` file in the `backend` folder:

```bash
# Windows PowerShell
Copy-Item .env.example .env

# Mac/Linux
cp .env.example .env
```

Edit `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanagement
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
NODE_ENV=development
```

### Start MongoDB
```bash
# Windows (run as service)
net start MongoDB

# Mac (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Or run manually
mongod
```

### Start Backend Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

Keep this terminal running!

---

## Step 3: Frontend Setup

Open a **new terminal** window.

### Install Dependencies
```bash
cd frontend
npm install
```

### Configure Environment Variables
Create a `.env` file in the `frontend` folder:

```bash
# Windows PowerShell
Copy-Item .env.example .env

# Mac/Linux
cp .env.example .env
```

The file should contain:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Start Frontend
```bash
npm start
```

Your browser should automatically open to `http://localhost:3000`

---

## Step 4: Test the Application

### Register a New User
1. Click "Register here" on the login page
2. Fill in:
   - Name: `Admin User`
   - Email: `admin@example.com`
   - Password: `password123`
   - Confirm Password: `password123`
3. Click "Register"

You should be automatically logged in and redirected to the dashboard!

### Create Your First Project
1. Click "Projects" in the navigation
2. Click "New Project" button
3. Fill in:
   - Project Name: `Website Redesign`
   - Description: `Redesign company website`
   - Status: `Active`
   - Priority: `High`
4. Click "Create Project"

### Create Your First Task
1. Click "Tasks" in the navigation
2. Click "New Task" button
3. Fill in:
   - Task Title: `Design Homepage`
   - Description: `Create homepage mockup`
   - Project: Select `Website Redesign`
   - Status: `In Progress`
   - Priority: `High`
   - Due Date: Select a future date
4. Click "Create Task"

### Explore the Dashboard
1. Click "Dashboard" in the navigation
2. View your statistics
3. See recent projects and tasks

---

## Common Issues & Solutions

### Issue: MongoDB connection error

**Error:** `MongoNetworkError: connect ECONNREFUSED`

**Solution:**
1. Make sure MongoDB is running
2. Check if MongoDB is listening on port 27017:
   ```bash
   # Windows
   netstat -an | findstr "27017"
   
   # Mac/Linux
   netstat -an | grep 27017
   ```
3. Try connecting to MongoDB shell:
   ```bash
   mongosh
   # or
   mongo
   ```

### Issue: Port already in use

**Error:** `Port 5000 is already in use`

**Solution:**
1. Change the port in `backend/.env`:
   ```env
   PORT=5001
   ```
2. Update frontend `.env`:
   ```env
   REACT_APP_API_URL=http://localhost:5001/api
   ```

### Issue: Module not found

**Error:** `Cannot find module 'express'`

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue: CORS error in browser

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
1. Make sure backend is running
2. Check `REACT_APP_API_URL` in frontend `.env`
3. Verify CORS is enabled in `backend/server.js`

### Issue: Frontend won't start

**Error:** Various React errors

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear React cache
rm -rf node_modules/.cache
npm start
```

---

## Development Workflow

### Making Changes

**Backend Changes:**
1. Edit files in `backend/`
2. Server auto-restarts (if using `npm run dev`)
3. Test with API client or frontend

**Frontend Changes:**
1. Edit files in `frontend/src/`
2. Browser auto-refreshes
3. Check browser console for errors

### Testing API Endpoints

Using VS Code REST Client or Postman:

```http
### Register
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}

### Login
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}

### Get Projects (requires token)
GET http://localhost:5000/api/projects
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## Project Structure

```
task-management-system/
├── backend/
│   ├── controllers/      # Route handlers
│   ├── models/          # Database schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Auth, validation
│   ├── .env            # Environment variables
│   ├── package.json
│   └── server.js       # Entry point
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── context/     # State management
│   │   ├── pages/       # Page components
│   │   ├── services/    # API calls
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   └── package.json
│
├── README.md
├── SRS_Document.md
├── API_DOCUMENTATION.md
└── DEPLOYMENT.md
```

---

## Useful Commands

### Backend
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start

# Install new package
npm install package-name
```

### Frontend
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Install new package
npm install package-name
```

### MongoDB
```bash
# Start MongoDB
mongod

# Connect to MongoDB shell
mongosh

# Show databases
show dbs

# Use specific database
use taskmanagement

# Show collections
show collections

# View users
db.users.find().pretty()

# View projects
db.projects.find().pretty()

# View tasks
db.tasks.find().pretty()

# Clear all data (CAUTION!)
db.users.deleteMany({})
db.projects.deleteMany({})
db.tasks.deleteMany({})
```

---

## Next Steps

1. **Customize the Application**
   - Update colors and branding
   - Add your logo
   - Modify features

2. **Add More Features**
   - File uploads
   - Email notifications
   - Real-time updates with Socket.io
   - Calendar view

3. **Deploy to Production**
   - Follow [DEPLOYMENT.md](DEPLOYMENT.md)
   - Set up MongoDB Atlas
   - Deploy to Render/Vercel

4. **Read Documentation**
   - [README.md](README.md) - Overview
   - [SRS_Document.md](SRS_Document.md) - Requirements
   - [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API Reference

---

## Getting Help

- **Check Console Logs**: Look for error messages in terminal and browser console
- **Review Documentation**: Read the docs in this repository
- **MongoDB Docs**: https://docs.mongodb.com/
- **Express Docs**: https://expressjs.com/
- **React Docs**: https://react.dev/

---

## Stopping the Servers

When you're done:

1. **Stop Backend**: Press `Ctrl + C` in backend terminal
2. **Stop Frontend**: Press `Ctrl + C` in frontend terminal
3. **Stop MongoDB** (optional):
   ```bash
   # Windows
   net stop MongoDB
   
   # Mac
   brew services stop mongodb-community
   
   # Linux
   sudo systemctl stop mongod
   ```

---

**You're all set! 🎉**

Start building awesome projects with your Task Management System!
