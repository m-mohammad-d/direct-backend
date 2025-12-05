import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { db } from "@/db";
import { HttpError } from "@/utils/HttpError";

interface JwtPayload {
  userId: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        username: string;
        email: string;
        createdAt: Date;
      };
    }
  }
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      new HttpError(401, "You are not authorized to perform this action")
    );
  }

  const token = authHeader.split(" ")[1];

  const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

  const user = await db.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
    },
  });

  if (!user) {
    return next(new HttpError(401, "User not found"));
  }

  req.user = user;
  next();
}
