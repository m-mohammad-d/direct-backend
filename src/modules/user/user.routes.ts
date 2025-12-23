
import { getMeController } from "@/modules/user/user.controller";
import { authMiddleware } from "@/middleware/authMiddleware";
import express from "express";

const router = express.Router();
router.get("/me", authMiddleware, getMeController);

export default router;
