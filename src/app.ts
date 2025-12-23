import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";

// Routes
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes";
import chatRoutes from "./modules/chat/chat.routes";
import messageRoutes from "./modules/message/message.routes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => res.send("API is running..."));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/chat/:chatId/messages", messageRoutes);

// Error handler
app.use(errorHandler);

export default app;
