import { db } from "@/db";
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
