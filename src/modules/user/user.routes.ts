import {
  changePasswordController,
  getMeController,
  getUserController,
  updateMeController,
} from "@/modules/user/user.controller";
import { authMiddleware } from "@/middleware/authMiddleware";
import express from "express";
import { validateBody } from "@/middleware/validate";
import { changePasswordSchema, updateUserSchema } from "./user.schema";

const router = express.Router();
router.get("/me", authMiddleware, getMeController);
router.patch(
  "/",
  authMiddleware,
  validateBody(updateUserSchema),
  updateMeController
);
router.patch(
  "/change-password",
  authMiddleware,
  validateBody(changePasswordSchema),
  changePasswordController
);
router.get("/:id", getUserController);

export default router;
