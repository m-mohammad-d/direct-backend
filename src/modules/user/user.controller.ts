import { Request, Response } from "express";

export const getMeController = (req: Request, res: Response) => {
  res.json({
    status: "success",
    data: req.user,
  });
};
