import express from "express";
import { authMiddleware } from "@/middleware/authMiddleware";
import { validateBody } from "@/middleware/validate";
import { createGroupChatSchema } from "@/modules/chat/chat.schema";
import {
  createGroupChat,
  getChatByIdController,
  getMyChats,
  joinChat,
  leaveChat,
} from "./chat.controller";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  validateBody(createGroupChatSchema),
  createGroupChat
);
router.get("/:id", authMiddleware, getChatByIdController);
router.get("/", authMiddleware, getMyChats);
router.post("/:inviteCode/join", authMiddleware, joinChat);
router.post("/:chatId/leave", authMiddleware, leaveChat);
export default router;
