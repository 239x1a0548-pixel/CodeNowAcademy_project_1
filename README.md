# 📚 Course Management System

A full-stack web application built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) that allows administrators to manage courses and students, while students can browse, enroll, and track their courses.

---

## 🗂️ Project Folder Structure

```
course-management-system/
│
├── 📁 Adminbackend/                  # Admin Backend (Node.js + Express)
│   ├── 📁 controllers/
│   │   ├── auth.js                   # Admin authentication logic
│   │   ├── crud.js                   # Course CRUD operations
│   │   └── student.js                # Student management logic
│   ├── 📁 models/
│   │   ├── admin.js                  # Admin schema (Mongoose)
│   │   ├── courses.js                # Course schema (Mongoose)
│   │   ├── Register.js               # Registration schema
│   │   └── User.js                   # User schema (Mongoose)
│   ├── 📁 routers/
│   │   └── authRoutes.js             # Admin auth API routes
│   ├── 📁 node_modules/
│   ├── .env                          # Environment variables (JWT secret, MongoDB URI)
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── server.js                     # Express app entry point
│
├── 📁 Adminfrontend/                 # Admin Frontend (React.js)
│   └── 📁 project_1/
│       ├── 📁 node_modules/
│       ├── 📁 public/
│       └── 📁 src/
│           ├── 📁 assets/
│           ├── 📁 components/
│           │   ├── Header.jsx            # Top navigation header
│           │   └── ProtectedRoute.jsx    # Route guard (JWT check)
│           ├── 📁 layouts/
│           │   └── DashboardLayout.jsx   # Admin dashboard layout wrapper
│           ├── 📁 pages/
│           │   ├── AdminDashboard.jsx    # Main admin dashboard page
│           │   ├── login.css             # Login page styles
│           │   ├── Students.jsx          # Student management page
│           │   ├── TempCourses.jsx       # Course management page
│           │   └── TempLogin.jsx         # Admin login page
│           ├── 📁 styles/
│           │   └── login.css             # Global login styles
│           ├── App.css
│           ├── App.jsx                   # Root React component
│           ├── index.css
│           └── main.jsx                  # React entry point
│       ├── .gitignore
│       ├── eslint.config.js
│       ├── index.html
│       ├── package-lock.json
│       ├── package.json
│       ├── README.md
│       └── vite.config.js
│
├── 📁 backend/                       # Student Backend (Node.js + Express)
│   ├── 📁 models/
│   │   ├── Course.js                 # Course schema (Mongoose)
│   │   ├── Register.js               # Registration schema
│   │   └── User.js                   # User schema (Mongoose)
│   ├── 📁 node_modules/
│   ├── .env                          # Environment variables
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── server.js                     # Express app entry point
│
└── 📁 coursesFrontend/               # Student Frontend (React.js)
    ├── 📁 node_modules/
    ├── 📁 public/
    └── 📁 src/
        ├── 📁 assets/
        │   ├── hero.png
        │   ├── react.svg
        │   └── vite.svg
        ├── 📁 Components/
        │   ├── 📁 dashboard/             # Student dashboard components
        │   │   ├── allCourses.css        # All Courses page styles
        │   │   ├── Card.jsx              # Course card component
        │   │   ├── dashboard.css         # Dashboard styles
        │   │   ├── Dashboard.jsx         # Student dashboard main
        │   │   ├── DashboardLayout.jsx   # Dashboard layout wrapper
        │   │   ├── FetchingCourses.jsx   # Course data fetching logic
        │   │   ├── Logout.jsx            # Logout component
        │   │   ├── NavBar.jsx            # Dashboard sidebar/navbar
        │   │   ├── Profile.jsx           # Student profile page
        │   │   ├── Search.jsx            # Course search component
        │   │   └── YourCourses.jsx       # My Courses page
        │   ├── Content.jsx               # Home page content section
        │   ├── HomeCard.jsx              # Home page course card
        │   ├── Layout.jsx                # Public layout wrapper
        │   ├── Login.css                 # Login styles
        │   ├── Login.jsx                 # Login page
        │   ├── nature_login.jpg          # Login background image
        │   ├── NavBar.jsx                # Public navigation bar
        │   ├── register_laptop.png       # Register page illustration
        │   ├── Register.jsx              # Student registration page
        │   └── ShowToast.jsx             # Toast notification component
        ├── App.css
        ├── App.jsx                       # Root React component
        ├── index.css
        └── main.jsx                      # React entry point
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── vite.config.js
```

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Vite, CSS Modules |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose ODM |
| Authentication | JWT (JSON Web Tokens), Bcrypt |
| Dev Tools | VS Code, Postman, Git |

---

## 📦 Modules Overview

### 🔴 Adminbackend
Handles all admin-side API operations:
- **auth.js** — Admin login and JWT issuance
- **crud.js** — Course add / delete operations
- **student.js** — Add / delete student accounts
- **authRoutes.js** — All admin API route definitions

### 🟠 Adminfrontend
Admin-facing React SPA:
- **AdminDashboard.jsx** — Live stats (Total Students, Courses, Enrollments) with student and course tables
- **Students.jsx** — View, add, and delete students
- **TempCourses.jsx** — View and add courses
- **ProtectedRoute.jsx** — Guards admin routes; redirects unauthenticated users to login
- **DashboardLayout.jsx** — Shared layout wrapper for all admin pages

### 🔵 backend
Handles all student-side API operations:
- **Course.js** — Course data model
- **User.js** — Student user model
- **Register.js** — Registration model
- **server.js** — Express app with routes for auth, courses, and enrollments

### 🟢 coursesFrontend
Student-facing React SPA:
- **Dashboard.jsx** — Categorised course browsing (All / Web Dev / Data Science / AI/ML / Prompt Engineering)
- **Card.jsx** — Individual course card with Register / Registered button
- **YourCourses.jsx** — My Courses page with Un Register option
- **Profile.jsx** — View and edit student profile
- **FetchingCourses.jsx** — Axios calls to fetch course and enrollment data
- **ShowToast.jsx** — Success and error toast notifications
- **Search.jsx** — Course search functionality

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- npm

---

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/course-management-system.git
cd course-management-system
```

---

### 2. Setup Admin Backend
```bash
cd Adminbackend
npm install
```
Create a `.env` file:
```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/coursemanagement
JWT_SECRET=your_jwt_secret_key
```
Start the server:
```bash
node server.js
```

---

### 3. Setup Student Backend
```bash
cd backend
npm install
```
Create a `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/coursemanagement
JWT_SECRET=your_jwt_secret_key
```
Start the server:
```bash
node server.js
```

---

### 4. Setup Admin Frontend
```bash
cd Adminfrontend/project_1
npm install
npm run dev
```
Runs at: `http://localhost:5174`

---

### 5. Setup Student Frontend
```bash
cd coursesFrontend
npm install
npm run dev
```
Runs at: `http://localhost:5173`

---

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `PORT` | Port for the Express server |

---

## 👤 User Roles

| Role | Access |
|------|--------|
| **Student** | Register, Login, Browse Courses, Enroll, Unregister, View Profile |
| **Admin** | Login, View Dashboard Stats, Add/Delete Students, Add/Delete Courses |

---

## 📡 API Endpoints

### Student Backend (`PORT 5000`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Student registration | Public |
| POST | `/api/auth/login` | Student login | Public |
| GET | `/api/courses` | Get all courses | Public |
| POST | `/api/enrollments` | Enroll in a course | Student |
| DELETE | `/api/enrollments/:courseId` | Unregister from a course | Student |
| GET | `/api/enrollments/my` | Get enrolled courses | Student |

### Admin Backend (`PORT 5001`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/login` | Admin login | Public |
| GET | `/api/students` | Get all students | Admin |
| POST | `/api/students` | Add a new student | Admin |
| DELETE | `/api/students/:id` | Delete a student | Admin |
| GET | `/api/courses` | Get all courses | Admin |
| POST | `/api/courses` | Add a new course | Admin |
| DELETE | `/api/courses/:id` | Delete a course | Admin |

---

## 🔮 Future Scope

- 📱 Mobile app using React Native
- 🤖 AI-based course recommendations
- 🔔 Email / push notifications
- 💳 Payment gateway for paid courses
- 🎓 Auto-generated certificates on course completion

---

## 📄 License

This project is developed for academic purposes.

---

> Built with ❤️ using the MERN Stack
