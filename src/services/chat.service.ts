import { db } from "@/db";
import { HttpError } from "@/utils/HttpError";
import { randomBytes } from "crypto";

const inviteCode = randomBytes(6).toString("hex");
export const createGroupChat = async (
  creatorId: string,
  userIds: string[] = [],
  title: string,
  avatar?: string,
  description?: string
) => {
  if (!userIds.includes(creatorId)) {
    userIds.push(creatorId);
  }

  return db.chat.create({
    data: {
      name: title,
      avatar,
      description,
      inviteCode,
      users: {
        connect: userIds.map((id) => ({ id })),
      },
    },
    include: {
      users: {
        select: { id: true, username: true, avatar: true },
      },
      messages: true,
    },
  });
};

export const getUserChats = async (userId: string) => {
  return db.chat.findMany({
    where: {
      users: {
        some: { id: userId },
      },
    },
    include: {
      users: {
        select: { id: true, username: true },
      },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const joinChat = async (inviteCode: string, userId: string) => {
  const existingChat = await db.chat.findFirst({
    where: {
      inviteCode,
      users: { some: { id: userId } },
    },
  });

  if (existingChat) {
    throw new HttpError(400, "You are already a member of this chat");
  }

  return db.chat.update({
    where: { inviteCode },
    data: {
      users: {
        connect: { id: userId },
      },
    },
    include: {
      users: { select: { id: true, username: true } },
    },
  });
};

export const leaveChat = async (chatId: string, userId: string) => {
  const chatMember = await db.chat.findFirst({
    where: {
      id: chatId,
      users: { some: { id: userId } },
    },
  });

  if (!chatMember) {
    throw new HttpError(404, "You are not a member of this group");
  }

  return db.chat.update({
    where: { id: chatId },
    data: {
      users: {
        disconnect: { id: userId },
      },
    },
  });
};
