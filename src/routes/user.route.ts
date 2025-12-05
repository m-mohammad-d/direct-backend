
import { getMeController } from "@/controllers/user.controller";
import { authMiddleware } from "@/middleware/authMiddleware";
import express from "express";

const router = express.Router();
router.get("/me", authMiddleware, getMeController);

export default router;
