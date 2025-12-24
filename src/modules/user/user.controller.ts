import { Request, Response } from "express";
import { changePassword, getUserById, updateUser } from "./user.service";
import { ChangePasswordInput } from "./user.schema";
import { HttpError } from "@/utils/HttpError";
import { stat } from "fs";

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

export const getUserController = async (
  req: Request,
  res: Response,
  next: any
) => {
  const { id } = req.params;
  const user = await getUserById(id);

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  return res.status(200).json({ status: "success", data: user });
};
