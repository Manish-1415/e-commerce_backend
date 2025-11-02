import { Router } from "express";
import {registerUser} from "./user.controller.js";
import { userValidation, userValidationMiddleware } from "./user.validation.js";

const router = Router();

router.post(
  "/register",
  userValidationMiddleware(userValidation),
  registerUser
);

export default router;
