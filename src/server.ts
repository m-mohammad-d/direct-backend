import dotenv from "dotenv";
import http from "http";
import app from "./app";
import { initSocket } from "./socket";

dotenv.config();

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Handle unhandled rejections
process.on("unhandledRejection", (err: Error) => {
  console.error("🔹Unhandled Rejection! Shutting down...");
  console.error("🔹Error Message:", err.message);
  server.close(() => process.exit(1));
});
