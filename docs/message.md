# Message Module

This module handles sending, retrieving, updating, and deleting messages within chats.  
It integrates with **Socket.IO** for real-time updates.

It uses:

- **Express.js**: for routing and middleware
- **Prisma ORM**: for database operations
- **Socket.IO**: for real-time message events
- **HttpError**: for standardized error handling

---

## Table of Contents

- [API Endpoints](#api-endpoints)
- [Controllers](#controllers)
- [Services](#services)
- [Error Handling](#error-handling)

---

## API Endpoints

| Method | Route                              | Description                               |
| ------ | ---------------------------------- | ----------------------------------------- |
| POST   | `/chat/:chatId/message/`           | Send a new message to a chat              |
| GET    | `/chat/:chatId/message/`           | Get messages of a chat (paginated)        |
| PUT    | `/chat/:chatId/message/:messageId` | Update a message (only sender can edit)   |
| DELETE | `/chat/:chatId/message/:messageId` | Delete a message (only sender can delete) |

All routes are protected by `authMiddleware`.

---

## Controllers

### `sendMessage(req, res)`

- Sends a message in a chat
- Validates that content is not empty
- Checks that user belongs to the chat
- Emits `new-message` event via Socket.IO
- Returns the created message

### `getMessages(req, res)`

- Retrieves messages of a chat
- Supports pagination with `page` and `limit` query params
- Returns messages along with pagination info

### `updateMessage(req, res)`

- Updates a message content
- Only the sender can update their message
- Emits `update-message` event via Socket.IO

### `deleteMessage(req, res)`

- Deletes a message
- Only the sender can delete their message
- Emits `delete-message` event via Socket.IO

---

## Services

### `sendMessage(userId, chatId, content)`

1. Validates content is not empty
2. Checks user membership in chat
3. Creates message in DB
4. Returns created message with sender info

### `getChatMessages(userId, chatId, page, limit)`

1. Checks user membership in chat
2. Fetches messages paginated
3. Returns messages with pagination metadata

### `updateMessage(userId, messageId, content)`

1. Validates content
2. Checks message exists and user is sender
3. Updates message content
4. Returns updated message with sender info

### `deleteMessage(userId, messageId)`

1. Checks message exists and user is sender
2. Deletes message from DB
3. Returns deleted message info

---

## Error Handling

- **400 Bad Request** → Message content is empty
- **403 Forbidden** → User does not belong to chat or is not message sender
- **404 Not Found** → Message or chat not found

All errors are thrown as `HttpError` and handled via Express error middleware.

---

## Notes

- Socket.IO events emitted:
  - `new-message` → when a new message is created
  - `update-message` → when a message is updated
  - `delete-message` → when a message is deleted
- Pagination default: `page=1`, `limit=20`
- Messages include sender info (`id`, `username`, `avatar`)
