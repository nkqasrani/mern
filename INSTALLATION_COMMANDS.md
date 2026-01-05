# Installation Commands
## Quick Reference for Task Management System

---

## Initial Setup

### 1. Navigate to Backend
```powershell
cd e:\5th_Semester\mern\task-management-system\backend
```

### 2. Install Backend Dependencies
```powershell
npm install
```

### 3. Create Backend .env File
```powershell
Copy-Item .env.example .env
```

Edit the `.env` file with your preferred editor:
```powershell
notepad .env
```

Add this content:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanagement
JWT_SECRET=d7f8e9a0b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z5
NODE_ENV=development
```

### 4. Navigate to Frontend
```powershell
cd ..\frontend
```

### 5. Install Frontend Dependencies
```powershell
npm install
```

### 6. Create Frontend .env File
```powershell
Copy-Item .env.example .env
```

Edit the `.env` file:
```powershell
notepad .env
```

Add this content:
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Running the Application

### Start MongoDB (if not running)

**Windows (MongoDB installed as service):**
```powershell
net start MongoDB
```

**Windows (Manual start):**
```powershell
# Open a new PowerShell window and run:
mongod
```

**Check if MongoDB is running:**
```powershell
mongosh
# or
mongo
```

### Start Backend Server

Open PowerShell in backend directory:
```powershell
cd e:\5th_Semester\mern\task-management-system\backend
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

### Start Frontend Server

Open a NEW PowerShell window:
```powershell
cd e:\5th_Semester\mern\task-management-system\frontend
npm start
```

Your browser should open automatically to `http://localhost:3000`

---

## Verification Commands

### Check if services are running:

```powershell
# Check if backend is running (port 5000)
netstat -an | findstr "5000"

# Check if frontend is running (port 3000)
netstat -an | findstr "3000"

# Check if MongoDB is running (port 27017)
netstat -an | findstr "27017"
```

### Test Backend API:

```powershell
# Using curl (if installed)
curl http://localhost:5000/api/auth/me

# Expected: 401 Unauthorized (proves server works)
```

---

## Common npm Commands

### Backend Commands
```powershell
cd backend

# Install dependencies
npm install

# Start with auto-reload (development)
npm run dev

# Start without auto-reload (production)
npm start

# Install a new package
npm install package-name

# Install dev dependency
npm install --save-dev package-name
```

### Frontend Commands
```powershell
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Install a new package
npm install package-name
```

---

## Cleanup Commands

### Remove node_modules and reinstall:

**Backend:**
```powershell
cd backend
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

**Frontend:**
```powershell
cd frontend
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

---

## MongoDB Commands

### Connect to MongoDB Shell:
```powershell
mongosh
# or for older versions:
mongo
```

### MongoDB Shell Commands:
```javascript
// Show all databases
show dbs

// Use taskmanagement database
use taskmanagement

// Show collections
show collections

// View all users
db.users.find().pretty()

// View all projects
db.projects.find().pretty()

// View all tasks
db.tasks.find().pretty()

// Count documents
db.users.countDocuments()
db.projects.countDocuments()
db.tasks.countDocuments()

// Delete all data (CAUTION!)
db.users.deleteMany({})
db.projects.deleteMany({})
db.tasks.deleteMany({})

// Drop entire database (CAUTION!)
db.dropDatabase()

// Exit
exit
```

---

## Git Commands (Optional)

### Initialize Git Repository:
```powershell
cd e:\5th_Semester\mern\task-management-system
git init
```

### Create .gitignore in root:
```powershell
@"
node_modules/
.env
*.log
.DS_Store
build/
dist/
"@ | Out-File -FilePath .gitignore -Encoding utf8
```

### First Commit:
```powershell
git add .
git commit -m "Initial commit: Task Management System"
```

### Connect to GitHub:
```powershell
git remote add origin https://github.com/yourusername/task-management-system.git
git branch -M main
git push -u origin main
```

---

## Troubleshooting Commands

### Kill processes on specific ports:

**Kill process on port 5000 (Backend):**
```powershell
$port = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue
if ($port) {
    Stop-Process -Id $port.OwningProcess -Force
    Write-Host "Process on port 5000 killed"
} else {
    Write-Host "No process found on port 5000"
}
```

**Kill process on port 3000 (Frontend):**
```powershell
$port = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($port) {
    Stop-Process -Id $port.OwningProcess -Force
    Write-Host "Process on port 3000 killed"
} else {
    Write-Host "No process found on port 3000"
}
```

### Clear npm cache:
```powershell
npm cache clean --force
```

### Update npm:
```powershell
npm install -g npm@latest
```

---

## Testing the API with PowerShell

### Register a user:
```powershell
$body = @{
    name = "Test User"
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method Post -Body $body -ContentType "application/json"
```

### Login:
```powershell
$body = @{
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body $body -ContentType "application/json"
$token = $response.data.token
Write-Host "Token: $token"
```

### Get projects (with token):
```powershell
$headers = @{
    Authorization = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:5000/api/projects" -Method Get -Headers $headers
```

---

## Environment Variables Reference

### Backend (.env):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanagement
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters
NODE_ENV=development
```

### Frontend (.env):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Production Environment Variables

### Backend (Production):
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanagement?retryWrites=true&w=majority
JWT_SECRET=generate_a_strong_random_secret_key_32_plus_characters
NODE_ENV=production
```

### Frontend (Production):
```env
REACT_APP_API_URL=https://your-backend-api.onrender.com/api
```

---

## Package Versions

### Backend Dependencies:
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.3",
  "dotenv": "^16.3.1",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "cors": "^2.8.5",
  "express-validator": "^7.0.1",
  "multer": "^1.4.5-lts.1"
}
```

### Frontend Dependencies:
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.1",
  "axios": "^1.6.2",
  "react-icons": "^4.12.0",
  "react-toastify": "^9.1.3"
}
```

---

## Quick Start (All-in-One)

Copy and run this in PowerShell (from project root):

```powershell
# Backend setup
cd backend
npm install
if (!(Test-Path .env)) { Copy-Item .env.example .env }

# Frontend setup
cd ..\frontend
npm install
if (!(Test-Path .env)) { Copy-Item .env.example .env }

Write-Host "`n✅ Installation complete!" -ForegroundColor Green
Write-Host "`n📝 Next steps:" -ForegroundColor Yellow
Write-Host "1. Edit backend/.env with your MongoDB URI and JWT secret"
Write-Host "2. Start MongoDB: net start MongoDB"
Write-Host "3. Start backend: cd backend && npm run dev"
Write-Host "4. Start frontend (new terminal): cd frontend && npm start"
```

---

## Stop All Services

```powershell
# Stop MongoDB
net stop MongoDB

# Kill backend (port 5000)
Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }

# Kill frontend (port 3000)
Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }

Write-Host "All services stopped" -ForegroundColor Green
```

---

## Useful Links

- **Node.js Download**: https://nodejs.org/
- **MongoDB Download**: https://www.mongodb.com/try/download/community
- **VS Code**: https://code.visualstudio.com/
- **Git**: https://git-scm.com/

---

**Ready to code! 🚀**
