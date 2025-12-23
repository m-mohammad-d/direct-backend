import { db } from "@/db";
import { UpdateUserInput } from "./user.schema";
import { AuthUser } from "./user.types";
import { HttpError } from "@/utils/HttpError";

export const updateUser = async (
  userId: string,
  data: UpdateUserInput
): Promise<AuthUser> => {
  if (data.username) {
    const existingUsername = await db.user.findUnique({
      where: { username: data.username },
    });
    if (existingUsername && existingUsername.id !== userId) {
      throw new HttpError(409, "Username already exists");
    }
  }

  const updatedUser = await db.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      username: true,
      email: true,
      avatar: true,
      createdAt: true,
    },
  });

  return updatedUser;
};
