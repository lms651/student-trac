# StudentTrac

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Jest](https://img.shields.io/badge/Jest-29.0.0-brightgreen.svg)](https://jestjs.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
![Static Badge](https://img.shields.io/badge/Pino-Logging-salmon)
![MongoDB](https://img.shields.io/badge/MongoDB-4.2-green?logo=mongodb&logoColor=white)

## Project Description

**StudentTrac** is a simple app designed for recording your past courses & GPA's!

**Future Features:**

- User authentication and login
- Admin dashboard for managing courses

---

## Features

- Create Profile
- View Profile
- Edit Profile
- Delete Profile
- View all active courses
- Add a course to your enrollment
- Delete a course from your enrollment
- Update a course GPA

---

## Tech Stack

| Layer    | Tech                          |
| -------- | ----------------------------- |
| Backend  | JavaScript, Node.js (Express) |
| Frontend | React, JavaScript             |
| Database | MongoDB (w/ Mongoose)         |
| Testing  | Jest                          |
| Logging  | Pino                          |

---

## Setup

### Prerequisites

- Node.js 14.x or higher
- npm (comes with Node.js)
- JavaScript (ES6+)
- MongoDB (local installation or MongoDB Atlas account)

### Quick Start

1. Clone the repository:

   ```bash
   git clone https://github.com/lms651/student-trac.git
   cd student-trac
   ```

2. Set up the backend:

   ```bash
   cd backend
   npm install
   ```

3. Set up the frontend:

   ```bash
   cd frontend
   npm install
   ```

4. Create environment files:

   Create a `.env` file in the `backend` directory with the following variables:

   - `HOST`: The hostname of your MongoDB server (usually `localhost` for local development).
   - `PORT`: The port MongoDB is running on (default `27017`).
   - `PROTOCOL`: The MongoDB protocol (`mongodb`).
   - `DBNAME`: Name of the main database for the app.
   - `TEST_DBNAME`: Name of the database to use for tests (optional).

   Create a .env file in the frontend directory with the following variable:

   - `VITE_API_URL`: The URL of your backend API (e.g., http://localhost:4000 for local development).

5. Start the services:
   - Backend:
     cd backend
     `node server.js`
   - Frontend:
     cd ../frontend
     `npm run dev`

## API Endpoints

### 1. GET /

**Description:** Checks if the backend server is running.

**Request:**

- Method: `GET`
- Produces: `text/plain`

**Response:**

- Status Code:

  - `200 OK`: Backend server is running!

### 2. GET /courses

**Description:** Retrieves all enabled courses.

**Request:**

- Method: `GET`
- Produces: `application/json`

**Response:**

- Status Codes:

  - `200 OK`: Successfully retrieved enabled courses.
  - `500 Internal Server Error`: Failed to retrieve courses.

- Response Body Example:

```json
[
  {
    "_id": "68d4970dc1dca89578cebeaa",
    "publicCourseId": "METCS579A1",
    "courseName": "Database Management",
    "semester": "Fall",
    "year": 2025,
    "enabled": true
  }
]
```

### 3. POST /students

**Description:** Adds a new student profile to the database.

**Request:**

- Method: `POST`
- Produces: `application/json`

**Response:**

- Status Codes:

  - `201 OK`: Student profile successfully created.
  - `400 Bad Request`: Failed to create student profile.

- Request Body Example:

```json
{
  "firstName": "John",
  "middleName": "A",
  "lastName": "Doe",
  "publicStudentId": "S1234567"
}
```

- Response Body Example:

```json
{
  "_id": "650f8b2c1d5c3a0012345678",
  "firstName": "John",
  "middleName": "A",
  "lastName": "Doe",
  "publicStudentId": "S1234567",
  "isDeleted": null,
  "createdAt": "2025-09-30T21:00:00.000Z",
  "updatedAt": "2025-09-30T21:00:00.000Z",
  "__v": 0
}
```

### 4. TO BE UPDATED SHORTLY...

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, please contact Lori
