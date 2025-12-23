import { db } from "@/db";
import { ChangePasswordInput, UpdateUserInput } from "./user.schema";
import { AuthUser } from "./user.types";
import { HttpError } from "@/utils/HttpError";
import { comparePassword, hashPassword } from "@/utils/hash";

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

export const changePassword = async (
  userId: string,
  input: ChangePasswordInput
) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { password: true },
  });

  if (!user) throw new HttpError(404, "User not found");

  const isMatch = await comparePassword(input.currentPassword, user.password!);
  if (!isMatch) throw new HttpError(401, "Current password is incorrect");

  const hashed = await hashPassword(input.newPassword);

  await db.user.update({
    where: { id: userId },
    data: { password: hashed },
  });

  return { message: "Password changed successfully" };
};
