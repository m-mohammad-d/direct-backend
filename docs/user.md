# User Module

This module handles user management, including fetching user info, updating profile, and changing password.

It uses:

- **Express.js**: for routing and middleware
- **Zod**: for request validation
- **Prisma ORM**: for database operations
- **HttpError**: for standardized error handling

---

## Table of Contents

- [API Endpoints](#api-endpoints)
- [Schemas](#schemas)
- [Controllers](#controllers)
- [Services](#services)
- [Error Handling](#error-handling)

---

## API Endpoints

| Method | Route                   | Description                    |
| ------ | ----------------------- | ------------------------------ |
| GET    | `/user/me`              | Get current authenticated user |
| PATCH  | `/user/`                | Update current user profile    |
| PATCH  | `/user/change-password` | Change password                |
| GET    | `/user/:id`             | Get user by ID                 |

All endpoints (except `GET /user/:id`) require authentication via `authMiddleware`.

---

## Schemas

### Update User Schema

| Field        | Type    | Constraints             |
| ------------ | ------- | ----------------------- |
| username     | string  | 3-30 chars, optional    |
| avatar       | string  | valid URL, optional     |
| displayName  | string  | max 50 chars, optional  |
| bio          | string  | max 160 chars, optional |
| showLastSeen | boolean | optional                |
| showOnline   | boolean | optional                |

### Change Password Schema

| Field           | Type   | Constraints                |
| --------------- | ------ | -------------------------- |
| currentPassword | string | min 8 characters, required |
| newPassword     | string | min 8 characters, required |

---

## Controllers

### `getMeController(req, res)`

- Returns authenticated user's data from `req.user`

### `updateMeController(req, res)`

- Updates authenticated user's profile
- Validates request body via `updateUserSchema`
- Returns updated user data

### `changePasswordController(req, res)`

- Changes authenticated user's password
- Validates body via `changePasswordSchema`
- Returns success message

### `getUserController(req, res)`

- Retrieves a user by ID
- Returns `404` if user not found

---

## Services

### `updateUser(userId, data: UpdateUserInput)`

1. Checks if username already exists for another user
2. Updates user fields in the database
3. Returns updated user data (without password)

### `changePassword(userId, input: ChangePasswordInput)`

1. Fetches user's current password
2. Compares `currentPassword` with stored password
3. Hashes and updates new password if matched
4. Returns a success message

### `getUserById(userId)`

- Fetches a user by ID
- Returns `null` if not found

---

## Error Handling

- **404 Not Found** → User not found
- **409 Conflict** → Username already exists
- **401 Unauthorized** → Current password incorrect
- Errors are thrown as `HttpError` and handled via Express error middleware

---

## Notes

- Passwords are always hashed before storage
- `authMiddleware` ensures only authenticated users can update their own profile or password
- `updateUser` only updates fields provided in the request body
