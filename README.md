# Code Duniya --- Learning Management System

Code Duniya is a full-stack Learning Management System (LMS) built for
students and instructors. The platform provides course discovery,
authentication, course enrollment, lesson management, learning progress
tracking, and instructor course management.

## 🌐 Live Demo

**Frontend:**\
https://learning-management-system-pi-eight.vercel.app

**Backend API:**\
https://learning-management-system-api-tau.vercel.app

## ✨ Features

### Student Features

-   Student registration and login
-   Browse available courses
-   View course details
-   Enroll in courses
-   Student dashboard
-   Continue learning from the current lesson
-   Watch course lessons
-   Track course progress
-   Mark lessons as completed
-   Resume learning from the current lesson
-   View completed and ongoing courses

### Instructor Features

-   Instructor login
-   Instructor dashboard
-   Create courses
-   Edit courses
-   Delete courses
-   View course details
-   Create lessons
-   Edit lessons
-   Delete lessons
-   View enrolled student counts
-   View lesson counts and course information

### Authentication & Security

-   JWT-based authentication
-   Role-based authorization
-   Protected frontend routes
-   Password hashing with bcrypt
-   Request validation with Zod
-   CORS configuration
-   Helmet security middleware
-   API rate limiting

## 🛠️ Technology Stack

### Frontend

-   React
-   TypeScript
-   Vite
-   Tailwind CSS
-   React Router
-   React Icons

### Backend

-   Node.js
-   Express.js
-   TypeScript
-   Mongoose
-   MongoDB
-   JWT
-   bcryptjs
-   Zod
-   Helmet
-   express-rate-limit

### Deployment

-   Vercel --- Frontend
-   Vercel --- Backend/API
-   MongoDB Atlas --- Database
-   GitHub --- Source control

## 📁 Project Structure

``` text
Learning_management_system/
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── validation/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
└── vite-project/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── routes/
    │   ├── services/
    │   └── App.tsx
    ├── package.json
    ├── vercel.json
    └── vite.config.ts
```

## 🚀 Run the Project Locally

### 1. Clone the repository

``` bash
git clone https://github.com/Sktanisha/Learning_management_system.git
cd Learning_management_system
```

### 2. Install frontend dependencies

``` bash
cd vite-project
npm install
```

Create a frontend environment file:

``` text
.env
```

Add:

``` env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

``` bash
npm run dev
```

The frontend will normally be available at:

``` text
http://localhost:5173
```

### 3. Install backend dependencies

Open another terminal:

``` bash
cd Backend
npm install
```

Create:

``` text
.env
```

Add:

``` env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Start the backend:

``` bash
npm run dev
```

The backend will normally run at:

``` text
http://localhost:5000
```

## 🔌 API Health Check

After starting the backend, open:

``` text
http://localhost:5000/api/health
```

Expected response:

``` json
{
  "success": true,
  "message": "Backend API is running"
}
```

## 🔐 Environment Variables

### Backend

  Variable        Description
  --------------- ---------------------------------
  `PORT`          Local backend port
  `MONGODB_URI`   MongoDB Atlas connection string
  `JWT_SECRET`    Secret used to sign JWT tokens
  `CLIENT_URL`    Frontend URL allowed by CORS

### Frontend

  Variable         Description
  ---------------- ----------------------
  `VITE_API_URL`   Backend API base URL

For production, the frontend uses:

``` env
VITE_API_URL=https://learning-management-system-api-tau.vercel.app/api
```

Do not commit `.env` files or expose database credentials and JWT
secrets.

## 👥 User Roles

The application supports three roles:

-   **Student**
-   **Instructor**
-   **Admin**

Access to protected functionality is controlled using JWT authentication
and role-based authorization.

## 📚 Main API Areas

### Authentication

``` text
POST /api/auth/register
POST /api/auth/login
```

### Courses

``` text
GET    /api/courses
GET    /api/courses/:id
POST   /api/courses
PUT    /api/courses/:id
DELETE /api/courses/:id
```

### Lessons

``` text
GET    /api/courses/:courseId/lessons
GET    /api/lessons/:id
POST   /api/courses/:courseId/lessons
PUT    /api/lessons/:id
DELETE /api/lessons/:id
```

### Enrollments

``` text
GET  /api/enrollments/my-courses
GET  /api/enrollments/:courseId
```

### Progress

``` text
GET  /api/progress/:courseId
POST /api/progress/:courseId/lessons/:lessonId/complete
PUT  /api/progress/:courseId/lessons/:lessonId/current
```

## 🗄️ Database

The application uses MongoDB with Mongoose.

Main collections/models include:

-   User
-   Course
-   Lesson
-   Enrollment
-   Progress

Course and progress data are synchronized with student enrollment and
lesson completion.

## ☁️ Deployment

The production architecture is:

``` text
User
  │
  ▼
Vercel Frontend
  │
  │ HTTPS API requests
  ▼
Vercel Express Backend
  │
  ▼
MongoDB Atlas
```

### Production URLs

Frontend:

``` text
https://learning-management-system-pi-eight.vercel.app
```

Backend:

``` text
https://learning-management-system-api-tau.vercel.app
```

Backend health check:

``` text
https://learning-management-system-api-tau.vercel.app/api/health
```

## 🔄 Deployment Workflow

The project uses GitHub as the source repository.

Typical workflow:

``` bash
git add .
git commit -m "Describe your changes"
git push origin main
```

Vercel automatically creates a new deployment from the updated `main`
branch.

## 🧪 Testing

The API can be tested locally using a browser or API testing tools such
as Postman.

Example:

``` text
GET http://localhost:5000/api/health
GET http://localhost:5000/api/courses
```

Authentication-protected endpoints require a valid JWT access token.

## 🔒 Security Notes

Never commit the following to GitHub:

``` text
.env
MONGODB_URI
JWT_SECRET
API keys
Passwords
Access tokens
```

Use environment variables for sensitive configuration in both local
development and production.

## 🎯 Project Goals

Code Duniya is designed to provide a foundation for an online learning
platform where:

-   Students can discover and complete courses.
-   Instructors can create and manage educational content.
-   Learning progress can be tracked.
-   Authentication and role-based access control protect platform
    functionality.
-   The application can be deployed as a production-ready full-stack web
    application.

## 👩‍💻 Author

**SK. Sanjida Tanisha**

Full-Stack Software Development Project

GitHub:\
https://github.com/Sktanisha

------------------------------------------------------------------------

## 📄 License

This project is currently intended as a learning/portfolio project. Add
a specific open-source license if you decide to distribute the source
code under one.
