import { HttpError } from "@/utils/HttpError";
import { Request, Response } from "express";

export const getMeController = (req: Request, res: Response) => {
  if (!req.user) {
    throw new HttpError(401, "You are not authorized");
  }

  res.json({
    status: "success",
    data: req.user,
  });
};
