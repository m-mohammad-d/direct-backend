import express from "express";
import { authMiddleware } from "@/middleware/authMiddleware";
import { validateBody } from "@/middleware/validate";
import { createGroupChatSchema } from "@/schema/chat.schema";
import { createGroupChat, getMyChats, joinChat, leaveChat } from "@/controllers/chat.controller";
import { getMessages, sendMessage } from "@/controllers/message.controller";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  validateBody(createGroupChatSchema),
  createGroupChat
);

router.get("/", authMiddleware, getMyChats);
router.post("/:chatId/messages", authMiddleware, sendMessage);
router.get("/:chatId/messages", authMiddleware, getMessages);
router.post("/:chatId/join", authMiddleware, joinChat);
router.post("/:chatId/leave", authMiddleware, leaveChat);
export default router;
