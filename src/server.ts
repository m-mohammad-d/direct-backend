import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API is running..."));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

process.on("unhandledRejection", (err: Error) => {
  console.error("🔹Unhandled Rejection! Shutting down...");
  console.error("🔹Error Message:", err.message);
  server.close(() => process.exit(1));
});
