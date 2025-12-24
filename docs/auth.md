# Authentication Module

This module handles user authentication, including **signup** and **signin** operations.

It uses:

- **Express.js**: for routing and middleware
- **Zod**: for request validation
- **Prisma ORM**: for database operations
- **JWT**: for token generation
- **Bcrypt**: for password hashing

---

## Table of Contents

- [API Endpoints](#api-endpoints)
- [Schemas](#schemas)
- [Controllers](#controllers)
- [Services](#services)
- [Error Handling](#error-handling)

---

## API Endpoints

| Method | Route     | Description                 |
| ------ | --------- | --------------------------- |
| POST   | `/signup` | Register a new user         |
| POST   | `/signin` | Login with email & password |

---

## Schemas

### Signup Schema

| Field    | Type   | Constraints                  |
| -------- | ------ | ---------------------------- |
| username | string | 3-32 characters              |
| email    | string | required, valid email format |
| password | string | 8-128 characters             |

### Signin Schema

| Field    | Type   | Constraints           |
| -------- | ------ | --------------------- |
| email    | string | required, valid email |
| password | string | minimum 8 characters  |

---

## Controllers

### `signupController(req, res, next)`

- Validates request body via `signupSchema`
- Calls `registerUser` service
- Generates JWT token
- Returns response:

```json
{
  "status": "success",
  "data": {
    "id": "user_id",
    "username": "username",
    "email": "user@example.com",
    "createdAt": "2025-12-24T00:00:00.000Z",
    "token": "jwt_token_here"
  }
}
```

### `signinController(req, res, next)`

- Validates request body via `signinSchema`
- Calls `signinService`
- Generates JWT token
- Returns response:

```json
{
  "status": "success",
  "data": {
    "id": "user_id",
    "username": "username",
    "email": "user@example.com",
    "createdAt": "2025-12-24T00:00:00.000Z",
    "token": "jwt_token_here"
  }
}
```

---

## Services

### `registerUser(input: SignupInput)`

1. Checks if email or username already exists
2. Hashes password using bcrypt
3. Creates new user in the database
4. Returns user info **without password**

### `signinService(input: SigninInput)`

1. Finds user by email
2. Verifies password using bcrypt
3. Returns user info **without password**

---

## Error Handling

- **409 Conflict** → Email or username already exists
- **401 Unauthorized** → Invalid email or password

All errors are thrown as `HttpError` and passed to Express error middleware.

---

## Notes

- Passwords are always hashed before storage
- JWT tokens are generated using `generateToken` util
- Prisma `select` is used to avoid returning passwords to clients
