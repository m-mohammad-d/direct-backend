
# 🟢 Direct Backend – Real-Time Chat API

This is the **backend API** for the **Direct** real-time chat application.
Built with **Express.js, TypeScript, Prisma, and Socket.IO**, it provides a robust, scalable, and maintainable architecture for real-time messaging, user management, and media uploads.

---

## ⚡ Features

* 👤 **User Management**

  * Sign up / Login / Authentication
  * Get current user (`me`)
  * Get user by ID
  * Update user profile (name, avatar, bio)
  * Change password with validation
* 💬 **Chat Management**

  * Create new chats / Group chats
  * Join & leave chats via invite code
  * Get chat by ID
  * Fetch all user chats
* ✏️ **Message Handling**

  * Send, edit, delete messages
  * Pagination support for chat messages
  * Total count & optimized fetching
* 📦 **Real-Time Communication**

  * Socket.IO integration for live messaging
  * Real-time updates for edits, deletions, and new messages
* 🖼️ **Media & Uploads**

  * Upload files/images via Cloudinary
  * Avatar & chat media handling
* 🔒 **Security & Validation**

  * JWT-based authentication
  * Input validation with **Zod**
  * Centralized error handling middleware

---

## 🧰 Tech Stack

* **Node.js & Express.js** – Backend framework
* **TypeScript** – Type safety and better developer experience
* **Prisma ORM** – Database access and migrations
* **PostgreSQL** – Relational database (via Prisma adapter)
* **Socket.IO** – Real-time bi-directional communication
* **Cloudinary** – Image and file uploads
* **Bcrypt** – Password hashing
* **JWT** – Authentication & authorization
* **Zod** – Schema validation
* **Nodemon & ts-node-dev** – Development hot-reloading

---


---

## 🚀 Getting Started

### 1️⃣ Clone repository

```bash
git clone https://github.com/m-mohammad-d/direct-backend.git
cd direct-backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment

Create a `.env` file in the root directory:

```
DATABASE_URL=postgresql://user:password@localhost:5432/direct
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4️⃣ Setup Prisma & Database

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5️⃣ Run in development

```bash
npm run dev
```

Server will start on `http://localhost:3000` (default) and hot-reload on changes.

### 6️⃣ Build for production

```bash
npm run build
npm start
```

---

## 💡 Development Notes

* All modules are **modularized** for maintainability.
* Socket.IO allows **real-time updates** for messages, edits, and deletions.
* Zod ensures **strong validation** for all requests.
* Prisma ensures **type-safe database access** and migrations.
* Cloudinary integration allows **secure media handling**.
* Centralized **error handling middleware** provides consistent API responses.

