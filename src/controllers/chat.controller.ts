import { Request, Response } from "express";
import * as chatService from "../services/chat.service";
import { HttpError } from "@/utils/HttpError";

export const createGroupChat = async (req: Request, res: Response) => {
  if (!req.user) {
    throw new HttpError(401, "Unauthorized");
  }

  const creatorId = req.user.id;
  const { userIds, title, avatar, description } = req.body;

  const chat = await chatService.createGroupChat(
    creatorId,
    userIds,
    title,
    avatar,
    description
  );

  return res.status(201).json({ status: "success", data: chat });
};

export const getMyChats = async (req: Request, res: Response) => {
  if (!req.user) {
    throw new HttpError(401, "Unauthorized");
  }

  const userId = req.user.id;
  const chats = await chatService.getUserChats(userId);
  return res.json({ status: "success", data: chats });
};
