import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";

import { errorHandler } from "./middleware/errorHandler";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.route";
import chatRoutes from "./routes/chat.routes";
import messageRoutes from "./routes/message.routes";
import { initSocket } from "./socket";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API is running..."));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/chat/:chatId/messages", messageRoutes);

// Error handler
app.use(errorHandler);

// Initialize socket
initSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Unhandled rejection
process.on("unhandledRejection", (err: Error) => {
  console.error("🔹Unhandled Rejection! Shutting down...");
  console.error("🔹Error Message:", err.message);
  server.close(() => process.exit(1));
});
