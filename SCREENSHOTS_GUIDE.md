# Screenshots and Visual Guide
## Task Management System

This document describes what each page of your application should look like. Use this as a reference when taking screenshots for your assignment submission.

---

## 📸 Required Screenshots for Submission

### 1. Authentication Pages

#### Login Page
**URL:** `http://localhost:3000/login`

**What to capture:**
- Login form with email and password fields
- "Login" button
- Link to registration page
- Purple gradient background
- Clean, centered card layout

**Test Credentials:**
```
Email: admin@example.com
Password: password123
```

---

#### Registration Page
**URL:** `http://localhost:3000/register`

**What to capture:**
- Registration form with:
  - Name field
  - Email field
  - Password field
  - Confirm Password field
- "Register" button
- Link to login page
- Validation messages (if any errors)

---

### 2. Dashboard Page

#### Main Dashboard
**URL:** `http://localhost:3000/`

**What to capture:**
- Navigation bar with:
  - "TaskManager" logo
  - Dashboard, Projects, Tasks links
  - User name and Logout button
  
- Statistics Cards showing:
  - Total Tasks (with blue icon)
  - Completed Tasks (with green icon)
  - My Tasks (with purple icon)
  - Overdue Tasks (with red icon)
  
- Two columns:
  - Recent Projects (left)
  - Recent Tasks (right)
  
- Each project/task showing status badges

---

### 3. Projects Page

#### Projects List View
**URL:** `http://localhost:3000/projects`

**What to capture:**
- Page header with "Projects" title and "New Project" button
- Search bar
- Filter dropdowns (Status, Priority)
- Project cards in grid layout
- Each card showing:
  - Project name
  - Description
  - Status badge (color-coded)
  - Priority badge (color-coded)
  - Delete icon
  - "View Details" button

---

#### Create Project Modal
**Action:** Click "New Project" button

**What to capture:**
- Modal overlay (dark background)
- Form with fields:
  - Project Name
  - Description (textarea)
  - Status dropdown
  - Priority dropdown
- "Cancel" and "Create Project" buttons
- Clean white modal card

---

#### Empty State
**What to capture:**
- Empty folder icon
- "No projects found" message
- "Create your first project to get started" text
- (Capture this before creating any projects)

---

### 4. Tasks Page

#### Tasks List View
**URL:** `http://localhost:3000/tasks`

**What to capture:**
- Page header with "Tasks" title and "New Task" button
- Search bar
- Filter dropdowns (Project, Status, Priority)
- Task cards in list layout
- Each card showing:
  - Task title
  - Description
  - Project name (blue text)
  - Assigned to information
  - Due date
  - Status badge
  - Priority badge
  - Delete icon

---

#### Create Task Modal
**Action:** Click "New Task" button

**What to capture:**
- Modal with form fields:
  - Task Title
  - Description
  - Project dropdown (populated)
  - Status dropdown
  - Priority dropdown
  - Due Date picker
- "Cancel" and "Create Task" buttons

---

### 5. Responsive Design

#### Mobile View - Dashboard
**How to capture:**
- Open browser DevTools (F12)
- Toggle device toolbar (Ctrl+Shift+M)
- Select iPhone or Android device
- Capture dashboard on mobile screen

**What to show:**
- Stacked navigation (hamburger menu style)
- Statistics cards in single column
- Recent projects and tasks in single column
- Touch-friendly buttons

---

#### Tablet View - Projects
**Device size:** iPad or similar

**What to capture:**
- Projects in 2-column grid
- Adapted navigation
- Proper spacing and sizing

---

### 6. Functionality Demonstrations

#### Search Functionality
**What to capture:**
- Before: Full list of projects
- During: Search term entered in search box
- After: Filtered results

---

#### Filter Functionality
**What to capture:**
- Filters dropdown opened
- Selected filter (e.g., Status: "Active")
- Filtered results showing only active projects

---

#### Status and Priority Badges
**What to capture:**
Close-up of:
- Different status badges:
  - Planning (gray)
  - Active (blue)
  - On-Hold (yellow)
  - Completed (green)
  - Cancelled (red)
  
- Different priority badges:
  - Low (green)
  - Medium (yellow)
  - High (orange)
  - Urgent (red)

---

### 7. Data and Interactions

#### Toast Notifications
**What to capture:**
- Success notification (green): "Project created successfully"
- Error notification (red): "Error creating project"
- Info notification (blue)
- Toast appearing in top-right corner

---

#### Loading States
**What to capture:**
- Spinner/loading indicator
- "Loading..." text
- Centered on page

---

#### Form Validation
**What to capture:**
- Form with validation errors
- Red border on invalid fields
- Error messages below fields
- Example: "Email is required", "Password must be at least 6 characters"

---

## 📊 Database Screenshots

### MongoDB Compass/Atlas

#### Users Collection
**What to capture:**
```javascript
{
  "_id": ObjectId("..."),
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "isActive": true,
  "createdAt": ISODate("..."),
  "updatedAt": ISODate("...")
}
```

---

#### Projects Collection
**What to capture:**
```javascript
{
  "_id": ObjectId("..."),
  "name": "Website Redesign",
  "description": "Complete website overhaul",
  "status": "active",
  "priority": "high",
  "owner": ObjectId("..."),
  "teamMembers": [...],
  "createdAt": ISODate("..."),
  "updatedAt": ISODate("...")
}
```

---

#### Tasks Collection
**What to capture:**
```javascript
{
  "_id": ObjectId("..."),
  "title": "Design Homepage",
  "description": "Create homepage mockup",
  "project": ObjectId("..."),
  "assignedTo": ObjectId("..."),
  "status": "in-progress",
  "priority": "high",
  "dueDate": ISODate("..."),
  "createdAt": ISODate("..."),
  "updatedAt": ISODate("...")
}
```

---

## 🔧 Development Screenshots

### VS Code - Backend Structure
**What to capture:**
- File explorer showing backend folder structure:
  - controllers/
  - models/
  - routes/
  - middleware/
  - server.js
  - package.json

---

### VS Code - Frontend Structure
**What to capture:**
- File explorer showing frontend folder structure:
  - src/
    - components/
    - context/
    - pages/
    - services/
  - public/
  - package.json

---

### Terminal - Backend Running
**What to capture:**
```
> npm run dev

[nodemon] starting `node server.js`
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

---

### Terminal - Frontend Running
**What to capture:**
```
> npm start

Compiled successfully!

You can now view task-management-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.x:3000
```

---

## 🌐 Deployment Screenshots

### Render Dashboard (Backend)
**What to capture:**
- Service dashboard
- Service URL
- Deploy logs showing successful deployment
- Environment variables section (blur sensitive data)

---

### Vercel Dashboard (Frontend)
**What to capture:**
- Project overview
- Deployment URL
- Build logs showing successful deployment
- Environment variables (blur sensitive data)

---

### MongoDB Atlas
**What to capture:**
- Cluster overview
- Database collections
- Connection string section (blur password)

---

## 📱 Browser DevTools Screenshots

### Network Tab - API Calls
**What to capture:**
- Network tab open (F12 > Network)
- API requests to backend:
  - GET /api/projects (Status: 200)
  - POST /api/auth/login (Status: 200)
  - POST /api/tasks (Status: 201)
- Request headers showing Authorization token
- Response preview showing JSON data

---

### Console - No Errors
**What to capture:**
- Clean console with no errors
- Shows application is working correctly
- Maybe some console.logs from development

---

### Application Tab - Local Storage
**What to capture:**
- Local Storage showing:
  - token: "eyJhbGciOiJIUzI1NiIsInR5..."
  - user: {"_id":"...","name":"John Doe",...}

---

## 📋 API Testing Screenshots

### Postman/Thunder Client

#### Register Request
**What to capture:**
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

Body:
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}

Response: 201 Created
{
  "success": true,
  "message": "User registered successfully",
  "data": { ... }
}
```

---

#### Login Request
**What to capture:**
```
POST http://localhost:5000/api/auth/login

Body:
{
  "email": "test@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "success": true,
  "data": {
    "user": {...},
    "token": "eyJ..."
  }
}
```

---

#### Get Projects with Auth
**What to capture:**
```
GET http://localhost:5000/api/projects
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Response: 200 OK
{
  "success": true,
  "count": 5,
  "data": [...]
}
```

---

## 📸 Screenshot Organization

### Recommended Folder Structure:
```
screenshots/
├── 01-authentication/
│   ├── login-page.png
│   ├── register-page.png
│   └── validation-errors.png
│
├── 02-dashboard/
│   ├── dashboard-overview.png
│   └── statistics-cards.png
│
├── 03-projects/
│   ├── projects-list.png
│   ├── create-project-modal.png
│   ├── empty-state.png
│   └── project-filters.png
│
├── 04-tasks/
│   ├── tasks-list.png
│   ├── create-task-modal.png
│   └── task-details.png
│
├── 05-responsive/
│   ├── mobile-dashboard.png
│   ├── tablet-projects.png
│   └── desktop-full.png
│
├── 06-database/
│   ├── mongodb-users.png
│   ├── mongodb-projects.png
│   └── mongodb-tasks.png
│
├── 07-deployment/
│   ├── render-backend.png
│   ├── vercel-frontend.png
│   └── mongodb-atlas.png
│
└── 08-api-testing/
    ├── postman-register.png
    ├── postman-login.png
    └── postman-projects.png
```

---

## 💡 Tips for Great Screenshots

### General Tips:
1. **Clear browser cache** before taking screenshots
2. **Use incognito/private mode** for clean browser
3. **Full screen** the application window
4. **Hide bookmarks bar** (Ctrl+Shift+B)
5. **Use consistent test data** across screenshots

### Content Tips:
6. **Create realistic data:**
   - Use professional project names
   - Write clear descriptions
   - Use realistic dates

7. **Show variety:**
   - Different statuses
   - Different priorities
   - Mix of completed/pending tasks

8. **Highlight features:**
   - Show search working
   - Show filters applied
   - Show different user roles

### Technical Tips:
9. **High resolution:** 1920x1080 or higher
10. **Proper zoom level:** 100% (Ctrl+0)
11. **Clean desktop** if capturing full screen
12. **Good lighting** if photographing screen

### Privacy Tips:
13. **Blur sensitive data:**
    - Database passwords
    - JWT tokens
    - Email addresses (if real)
    - API keys

14. **Use test accounts:**
    - test@example.com
    - admin@example.com
    - Don't use real personal info

---

## 🎨 What Makes a Good Screenshot

### Good Example:
✅ Clear and focused  
✅ Proper resolution  
✅ Shows the feature in action  
✅ Realistic test data  
✅ Clean UI with no errors  
✅ Proper annotations (if needed)  

### Bad Example:
❌ Blurry or low resolution  
❌ Console errors visible  
❌ Dummy/placeholder text (e.g., "asdfasdf")  
❌ Half-loaded pages  
❌ Personal information visible  
❌ Cluttered or messy  

---

## 📝 Screenshot Checklist

Before submitting, ensure you have:

### Application Screenshots:
- [ ] Login page
- [ ] Registration page (with validation)
- [ ] Dashboard with data
- [ ] Projects list page
- [ ] Create project modal
- [ ] Tasks list page
- [ ] Create task modal
- [ ] Mobile responsive view
- [ ] Toast notifications
- [ ] Loading states

### Technical Screenshots:
- [ ] VS Code backend structure
- [ ] VS Code frontend structure
- [ ] Terminal showing backend running
- [ ] Terminal showing frontend running
- [ ] MongoDB data (users, projects, tasks)
- [ ] Browser DevTools (Network tab)
- [ ] API testing (Postman/curl)

### Deployment Screenshots:
- [ ] Render backend deployed
- [ ] Vercel frontend deployed
- [ ] MongoDB Atlas cluster
- [ ] Working production URLs

---

## 🎯 Minimum Required Screenshots

If time is limited, these are the **absolute minimum** screenshots needed:

1. **Login page** - Shows authentication
2. **Dashboard** - Shows main features
3. **Projects list** - Shows CRUD operations
4. **Tasks list** - Shows task management
5. **Create modal** - Shows forms
6. **Mobile view** - Shows responsiveness
7. **MongoDB data** - Shows database
8. **Deployed app** - Shows working deployment

**Recommended:** 15-20 high-quality screenshots  
**Minimum:** 8 screenshots above

---

## 📤 How to Submit Screenshots

### Option 1: In Documentation
Create a folder named `screenshots/` in your project root and reference them in README:

```markdown
## Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Projects
![Projects](screenshots/projects.png)
```

### Option 2: Separate Document
Create `SCREENSHOTS.md` with all images and descriptions.

### Option 3: Presentation
Create a PDF/PowerPoint with annotated screenshots.

---

## 🎨 Annotation Tools (Optional)

Use these to highlight features in screenshots:
- **Windows:** Snip & Sketch, Paint 3D
- **Mac:** Preview, Skitch
- **Cross-platform:** Greenshot, ShareX, Lightshot
- **Online:** Photopea, Canva

Add arrows, boxes, or text to highlight specific features.

---

**Your visual documentation is ready! 📸**

Take clear, professional screenshots to showcase your working application.

