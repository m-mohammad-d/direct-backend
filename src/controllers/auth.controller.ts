import { registerUser, signinService } from "@/services/auth.service";
import { generateToken } from "../utils/jwt";
import { Request, Response, NextFunction } from "express";

export async function signupController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await registerUser(req.body);
    const token = generateToken(result.id);

    res.json({
      status: "success",
      data: { ...result, token },
      token,
    });
  } catch (err) {
    next(err);
  }
}

export async function signinController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await signinService(req.body);
    const token = generateToken(result.user.id);

    res.json({
      status: "success",
      data: { ...result.user, token },
    });
  } catch (err) {
    next(err);
  }
}
