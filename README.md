# To-Do List SaaS Application

![Hero Image Placeholder](./app.png)

A professional, secure, multi-user task management SaaS application built with a modern REST API architecture. Manage your productivity with ease through a clean interface and robust security.

---

## 🚀 Features

-   **User Authentication**: Secure registration and login using stateless JWT and bcrypt password hashing.
-   **Protected Routes**: Dashboard and task management accessible only to authenticated users.
-   **Task Management**: Create, view, update, and delete tasks with immediate database persistence.
-   **Status Tracking**: Toggle task status between Pending and Completed with real-time UI updates.
-   **User Privacy**: Strict authorization logic ensuring users only interact with their own data.
-   **Responsive Design**: Styled with Tailwind CSS for a seamless experience across devices.

---

## 🏗️ Architecture

### System Overview

```mermaid
graph TD
    Client[Client Browser <br> React + Tailwind] -->|JSON Request + JWT Token| API[Node.js / Express API]
    API -->|Auth Middleware Check| Auth{Valid Token?}
    Auth -- No --> Reject[Return 401 Unauthorized]
    Auth -- Yes --> Controller[API Controller Logic]
    Controller -->|SQL Queries| DB[(MySQL Database)]
    DB -->|Row Data| Controller
    Controller -->|JSON Response| Client

    style Client fill:#f9f,stroke:#333,stroke-width:2px
    style API fill:#ff9,stroke:#333,stroke-width:2px
    style DB fill:#9cf,stroke:#333,stroke-width:2px
```

### Data Workflow

```mermaid
    sequenceDiagram
    actor User
    participant React Frontend
    participant Express Backend
    participant Auth Middleware
    participant MySQL DB

    Note over User, MySQL DB: The "Toggle Status" Workflow

    User->>React Frontend: Clicks Checkbox (Task ID: 5)
    React Frontend->>Express Backend: PUT /api/tasks/5 (Status: "completed")<br>+ Authorization Header (JWT)
    Express Backend->>Auth Middleware: Verify Token
    Auth Middleware-->>Express Backend: Token Valid (User ID: 1)
    Express Backend->>MySQL DB: UPDATE tasks SET status='completed' <br>WHERE id=5 AND user_id=1
    MySQL DB-->>Express Backend: Success (1 row affected)
    Express Backend-->>React Frontend: 200 OK { message: "Updated" }

    Note over React Frontend: Auto-Refresh Data

    React Frontend->>Express Backend: GET /api/tasks <br>+ Authorization Header (JWT)
    Express Backend->>MySQL DB: SELECT * FROM tasks WHERE user_id=1
    MySQL DB-->>Express Backend: Returns updated list rows
    Express Backend-->>React Frontend: Returns JSON Array of Tasks
    React Frontend->>User: Re-renders UI with checked box
```

---

## 🛠️ Tech Stack

### Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

### Database

![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)

---

## ⚙️ Getting Started

### Prerequisites

-   Node.js (v16+)
-   MySQL Server
-   npm or yarn

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/your-username/todo-saas-app.git
cd todo-saas-app
\`\`\`

### 2. Database Setup

1. Log in to your MySQL terminal:
   \`\`\`sql
   CREATE DATABASE todo_db;
   \`\`\`
2. The application includes an initialization script to create the necessary tables (\`users\`, \`tasks\`).
3. You will run this script after configuring the backend environment variables.

### 3. Backend Configuration

1. Navigate to the backend directory:
   \`\`\`bash
   cd todo-backend
   npm install
   \`\`\`
2. Create a \`.env\` file:
   \`\`\`env
   PORT=3000
   DB_HOST=localhost
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=todo_db
   JWT_SECRET=your_super_secret_key
   \`\`\`
3. Initialize the database schema:
   \`\`\`bash
   node models/init.js
   \`\`\`
4. Start the backend server:
   \`\`\`bash
   npm run dev
   \`\`\`

### 4. Frontend Configuration

1. Open a new terminal and navigate to the frontend directory:
   \`\`\`bash
   cd todo-frontend
   npm install
   \`\`\`
2. Create a \`.env\` file:
   \`\`\`env
   VITE_API_URL=http://localhost:3000/api
   \`\`\`
3. Start the frontend development server:
   \`\`\`bash
   npm run dev
   \`\`\`

---

## 🔒 Security

-   **Authentication**: Stateless sessions via JWT stored in \`localStorage\`.
-   **Authorization**: Custom middleware verifies ownership of resources before any DB operation.
-   **Data Integrity**: Passwords are never stored in plain text, using \`bcrypt\` for hashing.
