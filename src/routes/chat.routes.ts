import express from "express";
import { authMiddleware } from "@/middleware/authMiddleware";
import { validateBody } from "@/middleware/validate";
import { createGroupChatSchema } from "@/schema/chat.schema";
import { createGroupChat, getMyChats } from "@/controllers/chat.controller";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  validateBody(createGroupChatSchema),
  createGroupChat
);

router.get("/", authMiddleware, getMyChats);

export default router;
