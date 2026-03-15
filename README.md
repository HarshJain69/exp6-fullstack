# Experiment 6 - JWT Authentication Backend

**Student Name:** Harsh Partap Jain  
**UID:** 23BAI70194

## Experiment 6 Overview

This project implements a JWT-based authentication backend using Node.js and Express. It demonstrates login-based token generation, middleware-based token verification, and secure access to protected routes.

## JWT Authentication Flow

1. User sends username and password to `POST /login`.
2. Server validates credentials using bcrypt password comparison.
3. On success, server signs and returns a JWT token (valid for 1 hour).
4. Client sends token in `Authorization: Bearer <token>` header.
5. Middleware verifies token signature and grants access to protected endpoints.

## Tech Stack

- Node.js
- Express
- jsonwebtoken
- bcrypt
- dotenv
- cors
- pnpm

## Project Structure

```text
src/
├── controllers/
│   └── authController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   └── userModel.js
├── routes/
│   └── authRoutes.js
├── server.js
└── config/
    └── db.js

.env
README.md
screenshots/
├── login-success.png
├── protected-route.png
└── token-response.png
```

## Environment Variables

Create `.env`:

```env
PORT=5000
JWT_SECRET=supersecretkey
```

## Routes Explanation

### `POST /login`

Authenticates user and returns JWT.

Request body:

```json
{
  "username": "user123",
  "password": "password123"
}
```

Success response:

```json
{
  "message": "Login successful",
  "token": "jwt_token_here"
}
```

### `GET /protected`

Requires Bearer token in Authorization header.

Example header:

```text
Authorization: Bearer your_jwt_token_here
```

Success response:

```json
{
  "message": "Protected route accessed",
  "user": {
    "userId": 1,
    "username": "user123",
    "iat": 1710000000,
    "exp": 1710003600
  }
}
```

If token is missing/invalid:

```json
{
  "message": "Unauthorized"
}
```

### `POST /logout` (Optional)

Stateless logout endpoint. Client deletes token.

## Setup Instructions (pnpm)

1. Initialize project:

```bash
pnpm init
```

2. Install dependencies:

```bash
pnpm add express jsonwebtoken bcrypt dotenv cors
```

3. Install dev dependency:

```bash
pnpm add -D nodemon
```

4. Add script in `package.json`:

```json
"scripts": {
  "dev": "nodemon src/server.js"
}
```

5. Start server:

```bash
pnpm dev
```

Server URL:

```text
http://localhost:5000
```

## Postman Testing Steps

1. Send `POST http://localhost:5000/login` with valid credentials.
2. Copy token from response.
3. Send `GET http://localhost:5000/protected` with header:

```text
Authorization: Bearer <token>
```

4. Verify protected response includes decoded user data.

## Screenshots

- Login success: `screenshots/Screenshot 2026-03-15 at 21.47.06.png`
- Token response: `screenshots/Screenshot 2026-03-15 at 21.53.17png`



