# API Documentation
## Task Management System

Base URL: `http://localhost:5000/api` (Development)  
Production URL: `https://your-backend-url.com/api`

---

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

---

## Endpoints

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "isActive": true
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login User
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Get Current User
```http
GET /api/auth/me
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "isActive": true
  }
}
```

#### Update User Details
```http
PUT /api/auth/updatedetails
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com"
}
```

#### Update Password
```http
PUT /api/auth/updatepassword
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

---

### Project Endpoints

#### Get All Projects
```http
GET /api/projects
```

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search in name/description
- `status` (optional): Filter by status
- `priority` (optional): Filter by priority

**Example:**
```
GET /api/projects?page=1&limit=10&status=active&search=website
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "total": 15,
  "page": 1,
  "pages": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Website Redesign",
      "description": "Complete website overhaul",
      "status": "active",
      "priority": "high",
      "owner": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "teamMembers": [],
      "createdAt": "2026-01-06T10:00:00.000Z",
      "updatedAt": "2026-01-06T10:00:00.000Z"
    }
  ]
}
```

#### Get Single Project
```http
GET /api/projects/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Website Redesign",
    "description": "Complete website overhaul",
    "status": "active",
    "priority": "high",
    "owner": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": null
    },
    "teamMembers": [
      {
        "user": {
          "_id": "507f1f77bcf86cd799439013",
          "name": "Jane Smith",
          "email": "jane@example.com"
        },
        "role": "member",
        "addedAt": "2026-01-06T10:00:00.000Z"
      }
    ],
    "startDate": "2026-01-01T00:00:00.000Z",
    "endDate": "2026-03-01T00:00:00.000Z",
    "tags": ["frontend", "design"],
    "createdAt": "2026-01-06T10:00:00.000Z",
    "updatedAt": "2026-01-06T10:00:00.000Z"
  }
}
```

#### Create Project
```http
POST /api/projects
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Mobile App Development",
  "description": "Build iOS and Android app",
  "status": "planning",
  "priority": "high",
  "startDate": "2026-02-01",
  "endDate": "2026-06-01",
  "tags": ["mobile", "react-native"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "name": "Mobile App Development",
    "description": "Build iOS and Android app",
    "status": "planning",
    "priority": "high",
    "owner": "507f1f77bcf86cd799439012",
    "teamMembers": [
      {
        "user": "507f1f77bcf86cd799439012",
        "role": "owner",
        "addedAt": "2026-01-06T10:30:00.000Z"
      }
    ]
  }
}
```

#### Update Project
```http
PUT /api/projects/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Mobile App Development V2",
  "status": "active",
  "priority": "urgent"
}
```

#### Delete Project
```http
DELETE /api/projects/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Project and associated tasks deleted successfully",
  "data": {}
}
```

#### Add Team Member
```http
POST /api/projects/:id/members
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "userId": "507f1f77bcf86cd799439015",
  "role": "member"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Team member added successfully",
  "data": { ... }
}
```

#### Remove Team Member
```http
DELETE /api/projects/:id/members/:userId
```

**Headers:**
```
Authorization: Bearer <token>
```

---

### Task Endpoints

#### Get All Tasks
```http
GET /api/tasks
```

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `search` (optional): Search in title/description
- `project` (optional): Filter by project ID
- `status` (optional): Filter by status
- `priority` (optional): Filter by priority
- `assignedTo` (optional): Filter by assigned user

**Example:**
```
GET /api/tasks?project=507f1f77bcf86cd799439011&status=in-progress
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "total": 12,
  "page": 1,
  "pages": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "title": "Design homepage mockup",
      "description": "Create initial design concepts",
      "project": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Website Redesign"
      },
      "assignedTo": {
        "_id": "507f1f77bcf86cd799439013",
        "name": "Jane Smith",
        "email": "jane@example.com"
      },
      "createdBy": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "status": "in-progress",
      "priority": "high",
      "dueDate": "2026-01-15T00:00:00.000Z",
      "createdAt": "2026-01-06T10:00:00.000Z"
    }
  ]
}
```

#### Get Single Task
```http
GET /api/tasks/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "title": "Design homepage mockup",
    "description": "Create initial design concepts for the new homepage",
    "project": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Website Redesign"
    },
    "assignedTo": {
      "_id": "507f1f77bcf86cd799439013",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "avatar": null
    },
    "createdBy": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": null
    },
    "status": "in-progress",
    "priority": "high",
    "dueDate": "2026-01-15T00:00:00.000Z",
    "completedAt": null,
    "comments": [
      {
        "user": {
          "_id": "507f1f77bcf86cd799439012",
          "name": "John Doe",
          "email": "john@example.com"
        },
        "text": "Looking forward to seeing the designs!",
        "createdAt": "2026-01-06T11:00:00.000Z"
      }
    ],
    "attachments": [],
    "tags": ["design", "ui"],
    "createdAt": "2026-01-06T10:00:00.000Z",
    "updatedAt": "2026-01-06T11:00:00.000Z"
  }
}
```

#### Create Task
```http
POST /api/tasks
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Implement user authentication",
  "description": "Add login and registration functionality",
  "project": "507f1f77bcf86cd799439011",
  "assignedTo": "507f1f77bcf86cd799439013",
  "status": "todo",
  "priority": "high",
  "dueDate": "2026-01-20",
  "tags": ["backend", "security"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": { ... }
}
```

#### Update Task
```http
PUT /api/tasks/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "status": "completed",
  "priority": "medium"
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

#### Add Comment
```http
POST /api/tasks/:id/comments
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "text": "Great work on this task!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Comment added successfully",
  "data": { ... }
}
```

#### Get Task Statistics
```http
GET /api/tasks/stats/overview
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 45,
    "completed": 23,
    "myTasks": 8,
    "overdue": 3,
    "byStatus": [
      { "_id": "todo", "count": 12 },
      { "_id": "in-progress", "count": 8 },
      { "_id": "completed", "count": 23 },
      { "_id": "review", "count": 2 }
    ],
    "byPriority": [
      { "_id": "low", "count": 10 },
      { "_id": "medium", "count": 20 },
      { "_id": "high", "count": 12 },
      { "_id": "urgent", "count": 3 }
    ]
  }
}
```

---

### User Endpoints

#### Get All Users
```http
GET /api/users
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "avatar": null
    },
    {
      "_id": "507f1f77bcf86cd799439013",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "role": "manager",
      "avatar": null
    }
  ]
}
```

#### Get User by ID
```http
GET /api/users/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

---

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

---

## Data Enums

### Project Status
- `planning`
- `active`
- `on-hold`
- `completed`
- `cancelled`

### Task Status
- `todo`
- `in-progress`
- `review`
- `completed`
- `cancelled`

### Priority Levels
- `low`
- `medium`
- `high`
- `urgent`

### User Roles
- `user`
- `manager`
- `admin`

### Team Member Roles
- `owner`
- `manager`
- `member`
- `viewer`

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

### Login and Save Token
```bash
TOKEN=$(curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' \
  | jq -r '.data.token')

echo $TOKEN
```

### Get Projects
```bash
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer $TOKEN"
```

### Create Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Project","description":"This is a test","status":"active","priority":"high"}'
```

---

## Rate Limiting

Currently not implemented. Consider adding rate limiting in production:
- 100 requests per 15 minutes per IP
- 1000 requests per hour per user

---

## Pagination

Default pagination:
- Page: 1
- Limit: 10

Maximum limit: 100

Example with custom pagination:
```
GET /api/projects?page=2&limit=20
```

---

## Error Examples

### Validation Error
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters"
    }
  ]
}
```

### Authorization Error
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### Not Found Error
```json
{
  "success": false,
  "message": "Project not found"
}
```

---

**End of API Documentation**
