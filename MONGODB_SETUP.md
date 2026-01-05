# MongoDB Setup Guide

## Quick Options

### Option 1: MongoDB Atlas (Recommended - Free & Easy) ⭐

**MongoDB Atlas is a free cloud database - no installation needed!**

#### Steps:

1. **Create Account:**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up with Google/GitHub or email
   
2. **Create Free Cluster:**
   - Click "Build a Database"
   - Choose **FREE** tier (M0 Sandbox)
   - Select cloud provider (AWS recommended)
   - Choose region closest to you
   - Click "Create Cluster" (takes 3-5 minutes)

3. **Create Database User:**
   - Go to "Database Access" (left sidebar)
   - Click "Add New Database User"
   - Username: `admin`
   - Password: `admin123` (or your choice)
   - Click "Add User"

4. **Allow Network Access:**
   - Go to "Network Access" (left sidebar)
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String:**
   - Go to "Database" (left sidebar)
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

6. **Update Your .env:**
   ```
   MONGODB_URI=mongodb+srv://admin:admin123@cluster0.xxxxx.mongodb.net/task-management?retryWrites=true&w=majority
   ```
   
   **Important:** Replace:
   - `<password>` with your actual password (e.g., `admin123`)
   - `xxxxx` with your actual cluster ID
   - Add `/task-management` before the `?` to specify database name

---

### Option 2: Local MongoDB Installation

#### Windows:

1. **Download MongoDB:**
   - Visit: https://www.mongodb.com/try/download/community
   - Version: MongoDB Community Server (Latest)
   - Platform: Windows
   - Package: MSI

2. **Install:**
   - Run the downloaded `.msi` file
   - Choose "Complete" installation
   - **Check** "Install MongoDB as a Service"
   - **Check** "Install MongoDB Compass" (GUI tool)
   - Click "Install"

3. **Verify Installation:**
   ```powershell
   mongod --version
   ```

4. **Start MongoDB Service:**
   ```powershell
   net start MongoDB
   ```

5. **Your .env is already configured for local:**
   ```
   MONGODB_URI=mongodb://localhost:27017/task-management
   ```

---

## Recommendation

**Use MongoDB Atlas (Option 1)** because:
- ✅ No installation required
- ✅ Free forever (512 MB storage)
- ✅ Works immediately
- ✅ Easy to deploy later
- ✅ Accessible from anywhere
- ✅ Same URL for development and deployment

---

## Testing Connection

After setting up MongoDB, restart your backend:

```powershell
cd E:\5th_Semester\mern\task-management-system\backend
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

---

## Troubleshooting

### "MongoDB connection error"
- Check your connection string
- Verify username/password
- Ensure IP address is whitelisted (Atlas)
- Check MongoDB service is running (Local)

### "Authentication failed"
- Password in connection string must match database user password
- URL encode special characters in password

### "Network timeout"
- Check internet connection (Atlas)
- Verify network access settings (Atlas)
- Check firewall settings (Local)

---

**Choose MongoDB Atlas and get started in 5 minutes! 🚀**
