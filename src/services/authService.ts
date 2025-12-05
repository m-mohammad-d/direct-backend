import { SignupInput } from "../schema/auth";
import { hashPassword } from "../utils/hash";
import { db } from "../db";
import { HttpError } from "../utils/HttpError";

export async function registerUser(input: SignupInput) {
  const { email, password, username } = input;

  const existingEmail = await db.user.findUnique({ where: { email } });
  if (existingEmail) {
    throw new HttpError(409, "Email already exists");
  }

  const existingUsername = await db.user.findUnique({ where: { username } });
  if (existingUsername) {
    throw new HttpError(409, "Username already exists");
  }

  const hashed = await hashPassword(password);

  const user = await db.user.create({
    data: {
      username,
      email,
      password: hashed,
    },
    select: {
      id: true,
      email: true,
      username: true,
      createdAt: true,
    },
  });

  return user;
}
