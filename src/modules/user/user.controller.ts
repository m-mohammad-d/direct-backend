import { Request, Response } from "express";
import { updateUser } from "./user.service";

export const getMeController = (req: Request, res: Response) => {
  res.json({
    status: "success",
    data: req.user,
  });
};

export const updateMeController = async (req: Request, res: Response) => {
  const updates = req.body;
  const updatedUser = await updateUser(req.user!.id, updates);
  res.json({ status: "success", data: updatedUser });
};
