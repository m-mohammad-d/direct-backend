import express, { Router } from "express";
import { authMiddleware } from "@/middleware/authMiddleware";
import { upload } from "./upload.middleware";
import { uploadImageController } from "./upload.controller";

const router: Router = express.Router();

router.post(
  "/upload",
  authMiddleware,
  upload.single("image"),
  uploadImageController
);

export default router;
