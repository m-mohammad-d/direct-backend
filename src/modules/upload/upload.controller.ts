import { Request, Response } from "express"; 
import { uploadImage } from "./upload.service";
import fs from "fs";

export const uploadImageController = async (
  req: Request,
  res: Response
): Promise<any> => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const filePath = req.file.path;
  const result = await uploadImage(filePath, "user-uploads");

  fs.unlink(filePath, (err) => {
    if (err) console.error("Error deleting temp file:", err);
  });

  return res.json({ status: "success", data: result });
};
