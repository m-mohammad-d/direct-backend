import { validateBody } from "@/middleware/validate";
import { signupSchema } from "@/schema/auth";
import { signupController } from "../controllers/authController";
import express from "express";

const router = express.Router();
router.post("/signup", validateBody(signupSchema), signupController);

export default router;
