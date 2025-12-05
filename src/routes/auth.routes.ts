import { validateBody } from "@/middleware/validate";
import { signinSchema, signupSchema } from "@/schema/auth.schema";
import {
  signinController,
  signupController,
} from "../controllers/auth.controller";
import express from "express";

const router = express.Router();
router.post("/signup", validateBody(signupSchema), signupController);
router.post("/signin", validateBody(signinSchema), signinController);

export default router;
