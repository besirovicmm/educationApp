# Learning Management System (LMS)

## Overview

This Learning Management System (LMS) is a web application designed to facilitate online education. It provides a platform for teachers to manage classes, create lectures and assignments, and for students to access their course materials and submit assignments.

### Key Features:

- User authentication (teachers and students)
- Class management
- Lecture creation and management
- Assignment creation and management
- Role-based access control

## Tech Stack

- Frontend: React.js with Material-UI
- Backend: Node.js with Express.js
- Database: PostgreSQL
- API Querying: React Query
- Routing: React Router
- Authentication: JSON Web Tokens (JWT)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or later)
- npm (usually comes with Node.js)
- PostgreSQL (v12 or later)
- Git

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/your-username/lms-project.git
   cd lms-project
   ```

2. Set up the backend:
   ```
   cd backend
   npm install
   ```

3. Set up the database:
   - Create a PostgreSQL database for the project
   - Update the database configuration in `backend/knexfile.js` with your database credentials

4. Run database migrations:
   ```
   npx knex migrate:latest
   ```

5. Set up the frontend:
   ```
   cd ../frontend
   npm install
   ```

6. Create a `.env` file in the backend directory with the following content:
   ```
   PORT=5000
   JWT_SECRET=your_jwt_secret_here
   DATABASE_URL=your_postgres_connection_string_here
   ```

   Replace `your_jwt_secret_here` with a secure random string and `your_postgres_connection_string_here` with your actual database connection string.

## Running the Application

1. Start the backend server:
   ```
   cd backend
   npm start
   ```
   The server should start running on `http://localhost:5000`

2. In a new terminal, start the frontend development server:
   ```
   cd frontend
   npm start
   ```
   The React app should open in your default browser at `http://localhost:3000`

## Usage

- Navigate to `http://localhost:3000` in your web browser
- Log in as a teacher or student (you may need to seed some initial user data)
- Teachers can create and manage classes, lectures, and assignments
- Students can view their assigned classes, access lectures, and view assignments

## API Documentation

(Include brief documentation of your API endpoints here)

## Contributing

(Include guidelines for contributing to the project, if applicable)

## License

(Include license information here)

