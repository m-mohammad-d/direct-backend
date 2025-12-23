import { Request, Response } from "express";
import { changePassword, updateUser } from "./user.service";
import { ChangePasswordInput } from "./user.schema";

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

export const changePasswordController = async (req: Request, res: Response) => {
  const input: ChangePasswordInput = req.body;
  const result = await changePassword(req.user!.id, input);
  res.json({ status: "success", data: result });
};
