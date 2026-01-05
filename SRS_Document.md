# Software Requirements Specification (SRS)
## Task Management System

**Version:** 1.0  
**Date:** January 6, 2026  
**Prepared by:** [Your Name]  
**Project:** Task Management System using MERN Stack

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Overall Description](#2-overall-description)
3. [System Features and Requirements](#3-system-features-and-requirements)
4. [External Interface Requirements](#4-external-interface-requirements)
5. [Non-Functional Requirements](#5-non-functional-requirements)
6. [System Architecture](#6-system-architecture)
7. [Database Design](#7-database-design)
8. [Appendices](#8-appendices)

---

## 1. Introduction

### 1.1 Purpose
This Software Requirements Specification (SRS) document provides a complete description of the Task Management System. It describes the functional and non-functional requirements for the system, which is designed to help teams manage projects, assign tasks, track progress, and collaborate effectively.

### 1.2 Scope
The Task Management System is a web-based application that enables:
- User authentication and authorization
- Project creation and management
- Task assignment and tracking
- Team collaboration
- Progress monitoring and reporting
- Real-time updates on project status

**Benefits:**
- Improved team productivity
- Better project visibility
- Streamlined task assignment
- Enhanced collaboration
- Real-time progress tracking

**Goals:**
- Provide an intuitive interface for project and task management
- Enable secure multi-user access with role-based permissions
- Facilitate team collaboration and communication
- Deliver real-time updates and notifications

### 1.3 Definitions, Acronyms, and Abbreviations
- **API**: Application Programming Interface
- **CRUD**: Create, Read, Update, Delete
- **JWT**: JSON Web Token
- **MERN**: MongoDB, Express.js, React.js, Node.js
- **REST**: Representational State Transfer
- **SRS**: Software Requirements Specification
- **UI**: User Interface
- **UX**: User Experience

### 1.4 References
- MongoDB Documentation: https://docs.mongodb.com/
- Express.js Documentation: https://expressjs.com/
- React Documentation: https://react.dev/
- Node.js Documentation: https://nodejs.org/
- JWT Specification: https://jwt.io/

### 1.5 Overview
The remainder of this document contains:
- Overall system description
- Detailed functional requirements
- Interface requirements
- Non-functional requirements
- System architecture and design

---

## 2. Overall Description

### 2.1 Product Perspective
The Task Management System is a standalone web application built using the MERN stack. It operates as a client-server architecture where:
- **Frontend (React)**: Provides the user interface
- **Backend (Node.js + Express)**: Handles business logic and API endpoints
- **Database (MongoDB)**: Stores application data

The system can be deployed on cloud platforms and accessed via web browsers on desktop and mobile devices.

### 2.2 Product Functions
The major functions include:

1. **User Management**
   - User registration and authentication
   - Profile management
   - Role-based access control

2. **Project Management**
   - Create, view, update, and delete projects
   - Set project status and priority
   - Manage team members
   - Track project progress

3. **Task Management**
   - Create and assign tasks
   - Update task status and priority
   - Set due dates
   - Add comments and attachments
   - Track task completion

4. **Dashboard and Analytics**
   - View statistics and metrics
   - Monitor project and task status
   - Identify overdue items

5. **Search and Filter**
   - Search projects and tasks
   - Filter by status, priority, assignee
   - Sort results

### 2.3 User Classes and Characteristics
The system supports three user roles:

1. **Regular User**
   - Can create projects
   - Can create and manage tasks
   - Can be assigned to projects and tasks
   - **Technical Expertise**: Basic computer literacy
   - **Usage Frequency**: Daily

2. **Manager**
   - All user permissions
   - Can manage team members in projects
   - Can view team analytics
   - **Technical Expertise**: Intermediate
   - **Usage Frequency**: Daily

3. **Administrator**
   - All manager permissions
   - Can manage all users
   - Can access all projects and tasks
   - System configuration
   - **Technical Expertise**: Advanced
   - **Usage Frequency**: As needed

### 2.4 Operating Environment
- **Client Side**: Modern web browsers (Chrome, Firefox, Safari, Edge)
- **Server Side**: Node.js runtime environment
- **Database**: MongoDB 4.4 or higher
- **Deployment**: Cloud platforms (Render, Vercel, Netlify, AWS, Heroku)
- **Supported Devices**: Desktop computers, laptops, tablets, smartphones

### 2.5 Design and Implementation Constraints
- Must use MERN stack (MongoDB, Express.js, React, Node.js)
- Must implement RESTful API architecture
- Must use JWT for authentication
- Must support modern web browsers
- Must be responsive and mobile-friendly
- Must follow security best practices
- Database transactions must maintain ACID properties

### 2.6 Assumptions and Dependencies
**Assumptions:**
- Users have internet connectivity
- Users have modern web browsers
- MongoDB is properly configured and accessible
- Server has sufficient resources

**Dependencies:**
- MongoDB Atlas or local MongoDB instance
- Node.js and npm packages
- Third-party libraries (React, Express, Mongoose, etc.)
- Cloud hosting services for deployment

---

## 3. System Features and Requirements

### 3.1 User Authentication and Authorization

**Priority**: High  
**Description**: Secure user registration, login, and access control

#### 3.1.1 Functional Requirements

**FR-AUTH-1**: User Registration
- System shall allow new users to register with name, email, and password
- System shall validate email format
- System shall enforce minimum password length of 6 characters
- System shall hash passwords before storing
- System shall prevent duplicate email registrations

**FR-AUTH-2**: User Login
- System shall authenticate users with email and password
- System shall generate JWT token upon successful login
- System shall return user information and token
- System shall display error message for invalid credentials

**FR-AUTH-3**: Token Management
- System shall include JWT token in API requests
- System shall validate tokens for protected routes
- System shall expire tokens after 30 days
- System shall refresh tokens as needed

**FR-AUTH-4**: Role-Based Access Control
- System shall assign default "user" role on registration
- System shall restrict access based on user roles
- System shall allow administrators to modify user roles

**FR-AUTH-5**: Profile Management
- Users shall be able to view their profile
- Users shall be able to update their name and email
- Users shall be able to change their password
- System shall require current password for password changes

### 3.2 Project Management

**Priority**: High  
**Description**: Create and manage projects with team collaboration

#### 3.2.1 Functional Requirements

**FR-PROJ-1**: Create Project
- Users shall be able to create new projects
- Required fields: name, description
- Optional fields: status, priority, start date, end date
- System shall assign creator as project owner
- System shall automatically add owner to team members

**FR-PROJ-2**: View Projects
- Users shall see all projects they own or are members of
- System shall display project list with pagination
- System shall show project name, description, status, priority
- Users shall be able to click to view project details

**FR-PROJ-3**: Update Project
- Project owners and managers shall be able to update projects
- Editable fields: name, description, status, priority, dates
- System shall validate all input data
- System shall not allow changing project owner

**FR-PROJ-4**: Delete Project
- Only project owners and admins can delete projects
- System shall prompt for confirmation
- System shall delete all associated tasks
- System shall remove project from database

**FR-PROJ-5**: Team Management
- Owners and managers can add team members
- System shall assign roles: owner, manager, member, viewer
- Owners and managers can remove team members
- System shall not allow removing project owner

**FR-PROJ-6**: Search and Filter
- Users shall be able to search projects by name or description
- Users shall be able to filter by status
- Users shall be able to filter by priority
- Results shall update in real-time

### 3.3 Task Management

**Priority**: High  
**Description**: Create, assign, and track tasks within projects

#### 3.3.1 Functional Requirements

**FR-TASK-1**: Create Task
- Users shall be able to create tasks in projects they have access to
- Required fields: title, project
- Optional fields: description, assignee, status, priority, due date
- System shall record task creator
- System shall set default status to "todo"

**FR-TASK-2**: View Tasks
- Users shall see tasks from their accessible projects
- System shall display task list with pagination
- System shall show task details: title, project, assignee, status, priority
- Users shall be able to filter tasks by project

**FR-TASK-3**: Update Task
- Project members can update tasks
- Editable fields: title, description, assignee, status, priority, due date
- System shall automatically set completedAt when status changes to completed
- System shall validate all updates

**FR-TASK-4**: Delete Task
- Project owners, task creators, and admins can delete tasks
- System shall prompt for confirmation
- System shall remove task from database

**FR-TASK-5**: Comments
- Project members can add comments to tasks
- System shall record comment author and timestamp
- Comments shall be displayed chronologically
- System shall populate user information for comments

**FR-TASK-6**: Task Statistics
- System shall calculate total tasks
- System shall count completed tasks
- System shall identify tasks assigned to current user
- System shall detect overdue tasks
- System shall group tasks by status and priority

**FR-TASK-7**: Search and Filter
- Users shall search tasks by title or description
- Users shall filter by project, status, priority, assignee
- Results shall support pagination
- Filters can be combined

### 3.4 Dashboard and Analytics

**Priority**: Medium  
**Description**: Overview of projects, tasks, and statistics

#### 3.4.1 Functional Requirements

**FR-DASH-1**: Statistics Display
- Dashboard shall show total tasks count
- Dashboard shall show completed tasks count
- Dashboard shall show user's assigned tasks
- Dashboard shall highlight overdue tasks

**FR-DASH-2**: Recent Projects
- Dashboard shall display 5 most recent projects
- Each project shall show name, description, status
- Projects shall be clickable to view details

**FR-DASH-3**: Recent Tasks
- Dashboard shall display 5 most recent tasks
- Each task shall show title, project, status, priority
- Tasks shall be clickable to view details

**FR-DASH-4**: Visual Indicators
- System shall use color coding for status
- System shall use badges for priority levels
- System shall highlight overdue items

### 3.5 Data Validation and Error Handling

**Priority**: High  
**Description**: Ensure data integrity and provide user feedback

#### 3.5.1 Functional Requirements

**FR-VAL-1**: Input Validation
- System shall validate all form inputs
- System shall check required fields
- System shall validate email format
- System shall enforce minimum password length
- System shall display field-specific error messages

**FR-VAL-2**: Error Responses
- System shall return appropriate HTTP status codes
- System shall provide descriptive error messages
- System shall handle database errors gracefully
- System shall log errors for debugging

**FR-VAL-3**: Success Feedback
- System shall display success notifications
- System shall confirm destructive actions
- System shall update UI after operations

---

## 4. External Interface Requirements

### 4.1 User Interfaces

#### 4.1.1 General UI Requirements
- **Responsive Design**: UI shall adapt to different screen sizes
- **Navigation**: Clear navigation menu with Home, Projects, Tasks links
- **Consistency**: Consistent color scheme, typography, and spacing
- **Accessibility**: Keyboard navigation support, proper contrast ratios

#### 4.1.2 Specific Screens

**Login Screen**
- Email input field
- Password input field (masked)
- Login button
- Link to registration page
- Error message display area

**Registration Screen**
- Name input field
- Email input field
- Password input field (masked)
- Confirm password field (masked)
- Register button
- Link to login page
- Validation error display

**Dashboard**
- Statistics cards (4 metrics)
- Recent projects list
- Recent tasks list
- Navigation links

**Projects Page**
- Create project button
- Search bar
- Filter dropdowns (status, priority)
- Project cards grid
- Pagination controls

**Tasks Page**
- Create task button
- Search bar
- Filter dropdowns (project, status, priority)
- Task list
- Pagination controls

**Modal Forms**
- Project creation form
- Task creation form
- Clear labels and placeholders
- Submit and cancel buttons

### 4.2 Hardware Interfaces
- No direct hardware interfaces required
- Application runs in web browser
- Server requires standard computing hardware

### 4.3 Software Interfaces

#### 4.3.1 MongoDB Database
- **Interface Type**: Database Connection
- **Purpose**: Data persistence
- **Connection**: Mongoose ODM
- **Operations**: CRUD operations on collections
- **Collections**: users, projects, tasks

#### 4.3.2 External APIs
- **JWT Library**: For token generation and validation
- **bcryptjs**: For password hashing
- **Mongoose**: For MongoDB object modeling

#### 4.3.3 Frontend-Backend Communication
- **Protocol**: HTTP/HTTPS
- **Format**: JSON
- **Authentication**: Bearer token in Authorization header
- **Base URL**: `/api`
- **Methods**: GET, POST, PUT, DELETE

### 4.4 Communications Interfaces

#### 4.4.1 HTTP/HTTPS
- **Protocol**: HTTP 1.1
- **Port**: 5000 (backend), 3000 (frontend development)
- **Security**: HTTPS in production
- **CORS**: Enabled for cross-origin requests

#### 4.4.2 API Response Format
```json
{
  "success": true/false,
  "message": "Response message",
  "data": {},
  "errors": []
}
```

---

## 5. Non-Functional Requirements

### 5.1 Performance Requirements
- **Response Time**: API responses shall be delivered within 2 seconds under normal load
- **Throughput**: System shall support at least 100 concurrent users
- **Database Queries**: Optimized with indexes for frequently accessed fields
- **Pagination**: Large datasets shall be paginated (default 10 items per page)

### 5.2 Security Requirements

#### 5.2.1 Authentication
- Passwords shall be hashed using bcrypt with salt rounds ≥ 10
- JWT tokens shall be used for session management
- Tokens shall expire after 30 days
- Failed login attempts shall be logged

#### 5.2.2 Authorization
- Protected routes shall require valid JWT token
- Role-based access control shall be enforced
- Users shall only access their authorized resources

#### 5.2.3 Data Protection
- Sensitive data (passwords) shall never be logged
- Environment variables shall store secrets
- HTTPS shall be used in production
- Input validation shall prevent injection attacks

### 5.3 Reliability Requirements
- **Availability**: 99% uptime during business hours
- **Error Handling**: Graceful error handling with user-friendly messages
- **Data Backup**: Regular database backups
- **Recovery**: Ability to restore from backups

### 5.4 Maintainability Requirements
- **Code Organization**: Modular structure with clear separation of concerns
- **Documentation**: Comprehensive code comments and API documentation
- **Logging**: Error and activity logging for debugging
- **Version Control**: Git-based version control

### 5.5 Portability Requirements
- **Cross-Browser**: Support Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Cross-Platform**: Compatible with Windows, macOS, Linux
- **Mobile**: Responsive design for tablets and smartphones
- **Deployment**: Deployable to various cloud platforms

### 5.6 Usability Requirements
- **Learning Curve**: New users should be productive within 30 minutes
- **Intuitive UI**: Clear labels, logical workflow, minimal clicks
- **Feedback**: Loading states, success/error notifications
- **Help**: Tooltips and placeholder text for guidance

### 5.7 Scalability Requirements
- **Horizontal Scaling**: Architecture shall support multiple server instances
- **Database**: MongoDB shall support sharding for large datasets
- **Caching**: Implement caching strategies for frequently accessed data
- **Load Balancing**: Support load balancer integration

---

## 6. System Architecture

### 6.1 Architecture Overview
The system follows a three-tier architecture:

**Presentation Tier (Frontend)**
- React.js application
- Component-based UI
- Context API for state management
- Axios for API communication

**Application Tier (Backend)**
- Node.js runtime
- Express.js framework
- RESTful API design
- JWT authentication middleware
- Input validation middleware

**Data Tier (Database)**
- MongoDB database
- Mongoose ODM
- Schema validation
- Indexes for performance

### 6.2 Component Diagram

```
┌─────────────────────────────────────┐
│         React Frontend              │
│  ┌──────────┐  ┌──────────────┐    │
│  │Components│  │Context API    │    │
│  │(UI)      │  │(State Mgmt)   │    │
│  └──────────┘  └──────────────┘    │
│         │              │            │
│         └──────┬───────┘            │
│                │                    │
└────────────────┼────────────────────┘
                 │ HTTP/HTTPS (JSON)
┌────────────────┼────────────────────┐
│                ▼                    │
│      Express.js Backend             │
│  ┌──────────────────────────────┐  │
│  │  Routes                      │  │
│  │  ├─ /api/auth                │  │
│  │  ├─ /api/projects            │  │
│  │  ├─ /api/tasks               │  │
│  │  └─ /api/users               │  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │  Middleware                  │  │
│  │  ├─ Authentication           │  │
│  │  ├─ Authorization            │  │
│  │  └─ Validation               │  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │  Controllers                 │  │
│  │  ├─ authController           │  │
│  │  ├─ projectController        │  │
│  │  └─ taskController           │  │
│  └──────────────────────────────┘  │
│                │                    │
└────────────────┼────────────────────┘
                 │ Mongoose
┌────────────────┼────────────────────┐
│                ▼                    │
│          MongoDB Database           │
│  ┌──────────────────────────────┐  │
│  │  Collections                 │  │
│  │  ├─ users                    │  │
│  │  ├─ projects                 │  │
│  │  └─ tasks                    │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
```

### 6.3 Data Flow

**User Registration Flow:**
1. User submits registration form
2. Frontend validates input
3. Frontend sends POST request to `/api/auth/register`
4. Backend validates data
5. Backend hashes password
6. Backend creates user in database
7. Backend generates JWT token
8. Backend returns user data and token
9. Frontend stores token
10. Frontend redirects to dashboard

**Create Project Flow:**
1. Authenticated user submits project form
2. Frontend includes JWT in request header
3. Backend verifies token
4. Backend validates project data
5. Backend creates project with user as owner
6. Backend returns created project
7. Frontend updates UI

**Create Task Flow:**
1. User submits task form
2. Frontend validates project access
3. Backend verifies user has project access
4. Backend creates task
5. Backend returns task with populated references
6. Frontend updates task list

---

## 7. Database Design

### 7.1 Entity Relationship Diagram

```
┌──────────────┐         ┌──────────────┐
│    User      │         │   Project    │
├──────────────┤         ├──────────────┤
│ _id          │◄────────┤ owner        │
│ name         │         │ name         │
│ email        │         │ description  │
│ password     │    ┌────┤ teamMembers[]│
│ role         │    │    │ status       │
│ avatar       │    │    │ priority     │
│ isActive     │    │    │ startDate    │
│ createdAt    │    │    │ endDate      │
│ updatedAt    │    │    │ tags[]       │
└──────────────┘    │    │ createdAt    │
       ▲            │    │ updatedAt    │
       │            │    └──────────────┘
       │            │            ▲
       │            │            │
┌──────┴─────────┐  │    ┌───────┴──────┐
│     Task       │  │    │              │
├────────────────┤  │    │              │
│ _id            │  │    │              │
│ title          │  │    │              │
│ description    │  │    │              │
│ project        ├──┘    │              │
│ assignedTo     ├───────┘              │
│ createdBy      ├──────────────────────┘
│ status         │
│ priority       │
│ dueDate        │
│ completedAt    │
│ comments[]     │
│ attachments[]  │
│ tags[]         │
│ createdAt      │
│ updatedAt      │
└────────────────┘
```

### 7.2 Collection Schemas

#### 7.2.1 Users Collection
```javascript
{
  _id: ObjectId,
  name: String (required, trim),
  email: String (required, unique, lowercase),
  password: String (required, hashed, min: 6),
  role: String (enum: ['user', 'admin', 'manager'], default: 'user'),
  avatar: String (optional),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- email (unique)
- isActive

#### 7.2.2 Projects Collection
```javascript
{
  _id: ObjectId,
  name: String (required, trim),
  description: String (required, trim),
  status: String (enum: ['planning', 'active', 'on-hold', 'completed', 'cancelled']),
  priority: String (enum: ['low', 'medium', 'high', 'urgent']),
  startDate: Date,
  endDate: Date,
  owner: ObjectId (ref: 'User', required),
  teamMembers: [{
    user: ObjectId (ref: 'User'),
    role: String (enum: ['owner', 'manager', 'member', 'viewer']),
    addedAt: Date
  }],
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- owner + status (compound)
- teamMembers.user

#### 7.2.3 Tasks Collection
```javascript
{
  _id: ObjectId,
  title: String (required, trim),
  description: String (trim),
  project: ObjectId (ref: 'Project', required),
  assignedTo: ObjectId (ref: 'User'),
  createdBy: ObjectId (ref: 'User', required),
  status: String (enum: ['todo', 'in-progress', 'review', 'completed', 'cancelled']),
  priority: String (enum: ['low', 'medium', 'high', 'urgent']),
  dueDate: Date,
  completedAt: Date,
  attachments: [{
    filename: String,
    path: String,
    uploadedAt: Date
  }],
  comments: [{
    user: ObjectId (ref: 'User'),
    text: String (required),
    createdAt: Date
  }],
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- project + status (compound)
- assignedTo + status (compound)

### 7.3 Data Relationships

- **One-to-Many**: User → Projects (owner)
- **Many-to-Many**: Users ↔ Projects (team members)
- **One-to-Many**: Project → Tasks
- **Many-to-One**: Tasks → User (assignedTo)
- **Many-to-One**: Tasks → User (createdBy)
- **One-to-Many**: Task → Comments (embedded)

---

## 8. Appendices

### 8.1 Technology Stack

**Frontend:**
- React 18.2.0
- React Router DOM 6.20.1
- Axios 1.6.2
- React Icons 4.12.0
- React Toastify 9.1.3

**Backend:**
- Node.js (v14+)
- Express.js 4.18.2
- Mongoose 8.0.3
- bcryptjs 2.4.3
- jsonwebtoken 9.0.2
- express-validator 7.0.1
- cors 2.8.5
- dotenv 16.3.1

**Database:**
- MongoDB 4.4+

**Development Tools:**
- nodemon 3.0.2
- Git for version control

### 8.2 Deployment Platforms

**Backend Hosting:**
- Render
- Railway
- Heroku
- AWS Elastic Beanstalk

**Frontend Hosting:**
- Vercel
- Netlify
- GitHub Pages

**Database:**
- MongoDB Atlas (cloud)
- Local MongoDB instance (development)

### 8.3 API Response Examples

**Success Response:**
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Website Redesign",
    "description": "Redesign company website",
    "status": "active",
    "priority": "high",
    "owner": "507f1f77bcf86cd799439012",
    "createdAt": "2026-01-06T10:00:00.000Z"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

### 8.4 Security Best Practices

1. **Password Security**
   - Minimum 6 characters
   - Hashed with bcrypt (10+ salt rounds)
   - Never logged or displayed

2. **Token Security**
   - JWT with strong secret key
   - 30-day expiration
   - Included in Authorization header
   - Validated on every protected route

3. **Input Validation**
   - Server-side validation required
   - Sanitize all inputs
   - Use express-validator

4. **Error Handling**
   - Generic error messages to users
   - Detailed logs for developers
   - No sensitive data in error responses

5. **HTTPS**
   - Required in production
   - Encrypt data in transit

### 8.5 Future Enhancements

1. **File Upload**
   - Attach files to tasks
   - Store in cloud storage (AWS S3, Cloudinary)

2. **Real-time Updates**
   - WebSocket integration (Socket.io)
   - Live notifications
   - Real-time collaboration

3. **Advanced Analytics**
   - Charts and graphs
   - Project burndown charts
   - Team productivity metrics

4. **Calendar View**
   - Timeline visualization
   - Gantt charts
   - Calendar integration

5. **Email Notifications**
   - Task assignments
   - Due date reminders
   - Project updates

6. **Mobile App**
   - React Native application
   - Push notifications
   - Offline support

### 8.6 Glossary

- **CRUD**: Create, Read, Update, Delete operations
- **JWT**: JSON Web Token for authentication
- **Middleware**: Software layer that intercepts requests
- **Mongoose**: MongoDB ODM (Object Data Modeling) library
- **ODM**: Object Document Mapper
- **REST**: Architectural style for web services
- **Salt**: Random data added to passwords before hashing
- **Schema**: Structure definition for database collections
- **Token**: Encrypted string containing user information

### 8.7 Revision History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2026-01-06 | [Your Name] | Initial SRS document |

---

**End of Document**
