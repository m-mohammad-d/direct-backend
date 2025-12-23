import express from "express";
import { authMiddleware } from "@/middleware/authMiddleware";
import {
  sendMessage,
  getMessages,
  updateMessage,
  deleteMessage,
} from "@/modules/message/message.controller";

const router = express.Router({ mergeParams: true });

router.post("/", authMiddleware, sendMessage);
router.get("/", authMiddleware, getMessages);
router.put("/:messageId", authMiddleware, updateMessage);
router.delete("/:messageId", authMiddleware, deleteMessage);

export default router;
