# 🚀 MERN TaskFlow – Productivity & Task Management App

> A full-stack solution built with the MERN stack designed to manage user-specific tasks and demonstrate professional-grade API design and deployment capabilities. **Ready for live deployment.**

## 🎯 Project Goal (Portfolio Ready)

The primary goal of this project is to serve as a **feature-rich, resume-ready portfolio piece** by implementing core modern web development practices: secure authentication, user data isolation, and a smooth, dynamic user interface.

## ✨ Key Features Implemented (Day 1 Focus)

### 🔒 Secure Authentication & Authorization

* **JWT Implementation:** Built and verified a full-stack authentication system using **JSON Web Tokens (JWT)** for secure, stateless user sessions.
* **Password Hashing:** Implemented industry-standard password protection using **bcryptjs** to hash user credentials before storage.
* **RESTful Endpoints:** Completed secure API endpoints for user registration (`/api/auth/register`) and login (`/api/auth/login`).

### ⚙️ Core Stack & Technology

* **Frontend:** React (State Management, Routing)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (via Mongoose ODM)
* **Security:** JWT, bcryptjs
* **Testing:** Postman/Thunder Client verified API endpoints

---

## 🛠️ Getting Started (Local Development)

### Prerequisites

* Node.js (v18+)
* MongoDB Atlas Account
* Postman/Thunder Client for API testing

### Installation

1.  **Clone the repository:**
    ```bash
    git clone YOUR_NEW_REPO_URL mern-taskflow
    cd mern-taskflow
    ```

2.  **Setup Backend:**
    ```bash
    cd backend
    npm install
    # Create a .env file based on .env.example with your Atlas URI and JWT_SECRET
    node server.js
    ```
3.  **Setup Frontend:**
    ```bash
    cd ../frontend
    npm install
    npm run dev 
    ```

---
**Next Steps:** Frontend development and building the core Task CRUD functionality.