# Task Management System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for managing projects and tasks with team collaboration features.

## 🚀 Features

### Backend
- ✅ RESTful API with Express.js
- ✅ MongoDB with Mongoose ODM
- ✅ JWT-based authentication
- ✅ Role-based access control
- ✅ Data validation and error handling
- ✅ Pagination, filtering, and searching
- ✅ Secure password hashing with bcrypt

### Frontend
- ✅ Responsive React UI
- ✅ Context API for state management
- ✅ Protected routes
- ✅ Form validation
- ✅ Toast notifications
- ✅ Modern, clean design

### Core Functionality
- User authentication (Register/Login)
- Project management (Create, Read, Update, Delete)
- Task management with assignments
- Team member management
- Status and priority tracking
- Search and filter capabilities
- Dashboard with statistics

## 📋 Prerequisites

Before you begin, ensure you have installed:
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd task-management-system
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanagement
JWT_SECRET=your_secret_key_here_change_in_production
NODE_ENV=development
```

Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 📊 Database Schema

### User Model
- name
- email (unique)
- password (hashed)
- role (user/admin/manager)
- avatar
- isActive

### Project Model
- name
- description
- status (planning/active/on-hold/completed/cancelled)
- priority (low/medium/high/urgent)
- owner (User reference)
- teamMembers (array of User references with roles)
- startDate, endDate
- tags

### Task Model
- title
- description
- project (Project reference)
- assignedTo (User reference)
- createdBy (User reference)
- status (todo/in-progress/review/completed/cancelled)
- priority (low/medium/high/urgent)
- dueDate, completedAt
- comments
- attachments
- tags

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updatedetails` - Update user details
- `PUT /api/auth/updatepassword` - Update password

### Projects
- `GET /api/projects` - Get all projects (with pagination, search, filter)
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/members` - Add team member
- `DELETE /api/projects/:id/members/:userId` - Remove team member

### Tasks
- `GET /api/tasks` - Get all tasks (with pagination, search, filter)
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `POST /api/tasks/:id/comments` - Add comment
- `GET /api/tasks/stats/overview` - Get task statistics

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID

## 🌐 Deployment

### Backend Deployment (Render/Railway/Heroku)

1. **MongoDB Atlas Setup**
   - Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster
   - Get connection string
   - Update `MONGODB_URI` in environment variables

2. **Deploy to Render**
   - Push code to GitHub
   - Create new Web Service on Render
   - Connect your repository
   - Add environment variables
   - Deploy

3. **Environment Variables for Production**
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanagement
   JWT_SECRET=your_production_secret_key
   NODE_ENV=production
   ```

### Frontend Deployment (Vercel/Netlify)

1. **Update API URL**
   - Update `.env` with production backend URL
   ```
   REACT_APP_API_URL=https://your-backend-url.com/api
   ```

2. **Build the application**
   ```bash
   npm run build
   ```

3. **Deploy to Vercel**
   - Install Vercel CLI: `npm i -g vercel`
   - Run: `vercel`
   - Follow the prompts

4. **Deploy to Netlify**
   - Install Netlify CLI: `npm i -g netlify-cli`
   - Run: `netlify deploy`
   - For production: `netlify deploy --prod`

## 🧪 Testing

To test the API endpoints, you can use:
- Postman
- Thunder Client (VS Code extension)
- cURL

Sample request:
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

## 📱 Usage

1. **Register/Login**
   - Create a new account or login with existing credentials

2. **Create Projects**
   - Click "New Project" button
   - Fill in project details
   - Set status and priority

3. **Manage Tasks**
   - Create tasks within projects
   - Assign tasks to team members
   - Track progress with status updates
   - Add comments and attachments

4. **Dashboard**
   - View statistics
   - See recent projects and tasks
   - Monitor overdue items

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Your Name - [Your Email]

## 🙏 Acknowledgments

- MongoDB for the database
- Express.js for the backend framework
- React for the frontend library
- Node.js for the runtime environment
