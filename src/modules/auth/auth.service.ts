import { db } from "@/db";
import { hashPassword, comparePassword } from "@/utils/hash";
import { HttpError } from "@/utils/HttpError";
import { SignupInput, SigninInput } from "./auth.schema";


// Signup already exists
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

export async function signinService(input: SigninInput) {
  const { email, password } = input;

  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new HttpError(401, "Invalid email or password");
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new HttpError(401, "Invalid email or password");
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
    },
  };
}
