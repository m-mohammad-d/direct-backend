# Chat Module

This module handles group chat operations including creating chats, joining/leaving, and retrieving chat information.

It uses:

- **Express.js**: for routing and middleware
- **Zod**: for request validation
- **Prisma ORM**: for database operations
- **Crypto**: for generating random invite codes

---

## Table of Contents

- [API Endpoints](#api-endpoints)
- [Schemas](#schemas)
- [Controllers](#controllers)
- [Services](#services)
- [Error Handling](#error-handling)

---

## API Endpoints

| Method | Route                    | Description                             |
| ------ | ------------------------ | --------------------------------------- |
| POST   | `/chat/`                 | Create a new group chat                 |
| GET    | `/chat/:id`              | Get a chat by ID                        |
| GET    | `/chat/`                 | Get all chats of the authenticated user |
| POST   | `/chat/:inviteCode/join` | Join a chat using invite code           |
| POST   | `/chat/:chatId/leave`    | Leave a group chat                      |

All routes are protected by `authMiddleware`.

---

## Schemas

### Create Group Chat Schema

| Field       | Type            | Constraints                   |
| ----------- | --------------- | ----------------------------- |
| userIds     | string[] (UUID) | Optional, at least one member |
| title       | string          | Required, 1-100 chars         |
| avatar      | string (URL)    | Optional                      |
| description | string          | Optional, max 500 chars       |

---

## Controllers

### `createGroupChat(req, res)`

- Creates a new group chat
- Adds the creator to the member list if not already included
- Generates an invite code for the chat
- Returns the created chat with its members and messages

### `getChatByIdController(req, res)`

- Retrieves a chat by its ID
- Ensures the requesting user is a member
- Returns chat details including users (id, username, avatar, displayName)

### `getMyChats(req, res)`

- Retrieves all chats that the authenticated user belongs to
- Includes the last message of each chat

### `joinChat(req, res)`

- Joins a user to a chat using an invite code
- Throws error if already a member

### `leaveChat(req, res)`

- Removes a user from a chat
- Throws error if the user is not a member

---

## Services

### `createGroupChat(creatorId, userIds, title, avatar?, description?)`

1. Adds creator to the user list if missing
2. Generates random invite code
3. Creates chat in DB with users and optional avatar/description
4. Returns chat including users and messages

### `getUserChats(userId)`

- Fetches all chats where the user is a member
- Orders by creation date descending
- Includes last message and user info

### `joinChat(inviteCode, userId)`

- Checks if user is already a member
- Connects user to chat using invite code
- Returns updated chat with users

### `leaveChat(chatId, userId)`

- Checks if user is a member
- Disconnects user from chat
- Returns updated chat

### `getChatById(chatId, userId)`

- Fetches chat by ID only if user is a member
- Returns chat including users info

---

## Error Handling

- **400 Bad Request** → User is already a member when joining
- **404 Not Found** → Chat not found or user not a member
- Errors are thrown using `HttpError` and handled via Express error middleware

---

## Notes

- Invite codes are generated using `crypto.randomBytes(6)` (hex string)
- Prisma `include` is used to fetch related users and messages
- Passwords are not relevant here (handled in auth module)
