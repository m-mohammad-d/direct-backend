import { Request, Response } from "express";
import { io } from "@/socket";
import { HttpError } from "@/utils/HttpError";
import * as messageService from "../services/message.service";
export const sendMessage = async (req: Request, res: Response) => {
  if (!req.user) {
    throw new HttpError(401, "Unauthorized");
  }

  const userId = req.user.id;
  const { chatId } = req.params;
  const { content } = req.body;

  const message = await messageService.sendMessage(userId, chatId, content);

  io.to(chatId).emit("new-message", message);

  res.status(201).json(message);
};

export const getMessages = async (req: Request, res: Response) => {
  if (!req.user) {
    throw new HttpError(401, "Unauthorized");
  }

  const userId = req.user.id;
  const { chatId } = req.params;
  const { page, limit } = req.query;

  const messages = await messageService.getChatMessages(
    userId,
    chatId,
    Number(page),
    Number(limit)
  );

  res.json(messages);
};
