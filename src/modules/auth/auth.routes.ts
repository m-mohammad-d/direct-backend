import { validateBody } from "@/middleware/validate";
import { signinSchema, signupSchema } from "@/modules/auth/auth.schema";
import {
  signinController,
  signupController,
} from "./auth.controller";
import express from "express";

const router = express.Router();
router.post("/signup", validateBody(signupSchema), signupController);
router.post("/signin", validateBody(signinSchema), signinController);

export default router;
