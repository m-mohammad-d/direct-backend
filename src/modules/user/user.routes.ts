import {
  getMeController,
  updateMeController,
} from "@/modules/user/user.controller";
import { authMiddleware } from "@/middleware/authMiddleware";
import express from "express";
import { validateBody } from "@/middleware/validate";
import { updateUserSchema } from "./user.schema";

const router = express.Router();
router.get("/me", authMiddleware, getMeController);
router.patch(
  "/",
  authMiddleware,
  validateBody(updateUserSchema),
  updateMeController
);

export default router;
