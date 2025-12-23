import {
    changePasswordController,
  getMeController,
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
export default router;
