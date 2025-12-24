import { Request, Response } from "express";
import * as chatService from "./chat.service";
import { getChatById } from "./chat.service";
import { HttpError } from "@/utils/HttpError";

export const createGroupChat = async (req: Request, res: Response) => {
  const creatorId = req.user!.id;
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
export const getChatByIdController = async (
  req: Request,
  res: Response,
) => {
  const { id: chatId } = req.params;
  const userId = req.user!.id; 

  const chat = await getChatById(chatId, userId);

  if (!chat) {
    throw new HttpError(404, "Chat not found or access denied");
  }

  return res.status(200).json({
    status: "success",
    data: chat,
  });
};

export const getMyChats = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const chats = await chatService.getUserChats(userId);
  return res.json({ status: "success", data: chats });
};

export const joinChat = async (req: Request, res: Response) => {
  const { inviteCode } = req.params;
  const userId = req.user!.id;

  const chat = await chatService.joinChat(inviteCode, userId);

  return res.status(200).json({
    status: "success",
    message: "Joined chat successfully",
    data: chat,
  });
};

export const leaveChat = async (req: Request, res: Response) => {
  const { chatId } = req.params;
  const userId = req.user!.id;

  await chatService.leaveChat(chatId, userId);

  return res.status(200).json({
    status: "success",
    message: "Left the group successfully",
  });
};
