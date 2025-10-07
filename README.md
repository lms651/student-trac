# StudentTrac

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Jest](https://img.shields.io/badge/Jest-29.0.0-brightgreen.svg)](https://jestjs.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
![Static Badge](https://img.shields.io/badge/Pino-Logging-salmon)
![MongoDB](https://img.shields.io/badge/MongoDB-4.2-green?logo=mongodb&logoColor=white)

## Table of Contents

- [Description](#project-description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
  - [Students](#students)
  - [Courses](#courses)
  - [Enrollments](#enrollments)
- [License](#license)
- [Contact](#contact)

## Project Description

**StudentTrac** is a simple app designed for recording your past courses & GPA's!

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

**Future Features:**

- User authentication and login
- Admin dashboard for managing courses

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
     cd student-trac-frontend
     `npm run dev`

## API Endpoints

## Students

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

**Response Body Example (`200 OK`):**

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

**Request Body Example:**

```json
{
  "firstName": "John",
  "middleName": "A",
  "lastName": "Doe",
  "publicStudentId": "S1234567"
}
```

**Response Body Example (`201 Created`):**

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

### 4. GET /students/:id

**Description:** Retrieves a student's profile by ID.

**Request:**

- Method: `POST`
- Produces: `application/json`
- URL Parameters:
  - `id` (string, required): The MongoDB `\_id` of the student profile to retrieve.
- Request Body: None

**Response:**

- Status Codes:

  - `200 OK`: Student profile successfully retrieved.
  - `404 Not Found`: Profile not found or has been deleted.
  - `400 Bad Request`: Invalid ID or request failed.

**Response Body Example (`200 OK`):**

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

### 5. PUT /students/:id

**Description:** Updates a student's profile by ID.

**Request:**

- Method: `PUT`
- Produces: `application/json`
- URL Parameters:
  - `id` (string, required): The MongoDB `_id` of the student profile to update.
- Request Body: JSON object containing the updated student profile fields.

**Request Body Example:**

```json
{
  "firstName": "Jane",
  "middleName": "B",
  "lastName": "Doe",
  "publicStudentId": "S1234567"
}
```

**Response**

- Status Codes:

  - `200 OK`: Student profile successfully retrieved.
  - `404 Not Found`: Profile not found or has been deleted.
  - `400 Bad Request`: Failed to update the profile (e.g., invalid ID or validation error).

**Response Body Example (`200 OK`):**

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

### 6. DELETE /students/:id

**Description:** Soft deletes a student's profile by ID (sets `isDeleted` timestamp).

**Request:**

- Method: `DELETE`
- Produces: `application/json`
- URL Parameters:
  - `id` (string, required): The MongoDB `_id` of the student profile to delete.
- Request Body: None

**Response:**

- Status Codes:

  - `200 OK`: Student profile successfully soft deleted.
  - `404 Not Found`: Profile not found or already deleted.
  - `400 Bad Request`: Failed to delete the profile (e.g., invalid ID).

**Response Body Example (`200 OK`):**

```json
{
  "_id": "650f8b2c1d5c3a0012345678",
  "firstName": "John",
  "middleName": "A",
  "lastName": "Doe",
  "publicStudentId": "S1234567",
  "isDeleted": "2025-10-07T12:30:00.000Z",
  "createdAt": "2025-09-30T21:00:00.000Z",
  "updatedAt": "2025-10-07T12:30:00.000Z",
  "__v": 0
}
```

## Courses

### 7. GET /courses

**Description:** Retrieves all enabled courses.

**Request:**

- Method: `GET`
- Produces: `application/json`
- URL Parameters: None
- Request Body: None

**Response:**

- Status Codes:

  - `200 OK`: Successfully retrieved all enabled courses.
  - `400 Bad Request`: Failed to retrieve courses.

**Response Body Example (`200 OK`):**

```json
[
  {
    "_id": "650f8b2c1d5c3a0012345678",
    "courseName": "Database Management",
    "publicCourseId": "METCS579A1",
    "semester": "Fall",
    "year": 2025,
    "enabled": true,
    "createdAt": "2025-09-30T21:00:00.000Z",
    "updatedAt": "2025-09-30T21:00:00.000Z",
    "__v": 0
  },
  {
    "_id": "650f8b2c1d5c3a0012345679",
    "courseName": "Web App Development",
    "publicCourseId": "METCS601A1",
    "semester": "Fall",
    "year": 2025,
    "enabled": true,
    "createdAt": "2025-09-30T21:10:00.000Z",
    "updatedAt": "2025-09-30T21:10:00.000Z",
    "__v": 0
  }
]
```

## Enrollments

### 8. GET /enrollments/:studentId

**Description:** Gets all course enrollments for a student.

**Request:**

- Method: `GET`
- Produces: `application/json`
- URL Parameters:
  - `studentId` (string, required): The MongoDB `_id` of the student.
- Request Body: None

**Response:**

- Status Codes:

  - `200 OK`: Successfully retrieved student's courses.
  - `404 Not Found`: No enrollment found for this student.
  - `400 Bad Request`: Request failed.

**Response Body Example (`200 OK`):**

```json
[
  {
    "student": {
      "_id": "650f8b2c1d5c3a0012345678",
      "firstName": "John",
      "lastName": "Doe"
    },
    "course": {
      "_id": "650f8b2c1d5c3a0012345679",
      "courseName": "Database Management"
    },
    "dateEnrolled": "2025-10-07T12:00:00.000Z",
    "GPA": null
  }
]
```

### 9. POST /enrollments/:studentId

**Description:** Adds a course enrollment for a student.

**Request:**

- Method: `POST`
- Produces: `application/json`
- URL Parameters:
  - `studentId` (string, required): The MongoDB `_id` of the student.

**Request Body:**

```json
{
  "courseId": "650f8b2c1d5c3a0012345679"
}
```

**Response:**

- Status Codes:

  - `201 Created`: Successfully created enrollment.
  - `200 OK`: Course added to existing enrollment.
  - `400 Bad Request`: Student is already enrolled in course or invalid request.

**Response Body Example (`201 Created`):**

```json
{
  "_id": "650f8b2c1d5c3a0012345680",
  "courses": [
    {
      "student": "650f8b2c1d5c3a0012345678",
      "course": "650f8b2c1d5c3a0012345679",
      "dateEnrolled": "2025-10-07T12:00:00.000Z",
      "GPA": null
    }
  ]
}
```

### 10. DELETE /enrollments/:studentId/:courseId

**Description:** Removes a course from a student's enrollment.

**Request:**

- Method: `DELETE`
- Produces: `application/json`
- URL Parameters:
  - `studentId` (string, required): The MongoDB `_id` of the student.
  - `courseId` (string, required): The MongoDB `_id` of the course to remove.
- Request Body: None

**Response:**

- Status Codes:

  - `200 OK`: Course removed successfully.
  - `404 Not Found`: Enrollment not found for this student.
  - `400 Bad Request`: Request failed.

**Response Body Example (`200 OK`):**

```json
{
  "message": "Course removed successfully",
  "enrollment": {
    "_id": "650f8b2c1d5c3a0012345680",
    "courses": []
  }
}
```

### 4. PUT /enrollments/:studentId/:courseId

**Description:** Updates a student's GPA for a specific course.

**Request:**

- Method: `PUT`
- Produces: `application/json`
- URL Paramters:
  - `studentId` (string, required): The MongoDB `_id` of the student.
  - `courseId` (string, required): The MongoDB `_id` of the course to update.

**Request Body:**

```json
{
  "GPA": 3.8
}
```

**Response:**

- Status Codes:

  - `200 OK`: Enrollment updated successfully.
  - `404 Not Found`: Enrollment not found for this student or course not found in enrollment.
  - `400 Bad Request`: Request failed.

**Response Body Example (`200 OK`):**

```json
{
  "message": "Enrollment updated successfully",
  "enrollment": {
    "_id": "650f8b2c1d5c3a0012345680",
    "courses": [
      {
        "student": "650f8b2c1d5c3a0012345678",
        "course": "650f8b2c1d5c3a0012345679",
        "dateEnrolled": "2025-10-07T12:00:00.000Z",
        "GPA": 3.8
      }
    ]
  }
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, please contact Lori
