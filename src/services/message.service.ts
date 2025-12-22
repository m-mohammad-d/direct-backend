import { db } from "@/db";
import { HttpError } from "@/utils/HttpError";

export const sendMessage = async (
  userId: string,
  chatId: string,
  content: string
) => {
  if (!content || !content.trim()) {
    throw new HttpError(400, "Message cannot be empty");
  }

  const chat = await db.chat.findFirst({
    where: {
      id: chatId,
      users: {
        some: { id: userId },
      },
    },
  });

  if (!chat) {
    throw new HttpError(403, "Access denied to this chat");
  }

  return db.message.create({
    data: {
      content,
      senderId: userId,
      chatId,
    },
    include: {
      sender: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
};
export const getChatMessages = async (
  userId: string,
  chatId: string,
  page = 1,
  limit = 20
) => {
  page = Number(page) || 1;
  limit = Number(limit) || 20;

  const chat = await db.chat.findFirst({
    where: {
      id: chatId,
      users: {
        some: { id: userId },
      },
    },
  });

  if (!chat) {
    throw new HttpError(403, "Access denied to this chat");
  }

  const totalCount = await db.message.count({
    where: { chatId },
  });

  const messages = await db.message.findMany({
    where: { chatId },
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
    include: {
      sender: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
    },
  });

  return {
    messages,
    pagination: {
      totalCount,
      page,
      pageSize: messages.length,
      totalPages: Math.ceil(totalCount / limit),
    },
  };
};
