import { registerUser } from "../services/authService";
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
      data: { ...result },
      token: token,
    });
  } catch (err) {
    next(err);
  }
}
