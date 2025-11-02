import { Router } from "express";
import { loginUser } from "./auth.controller";
import { loginValidation, loginValidationMiddleware } from "./auth.validation";

const router = Router();

router.post("/login", loginValidationMiddleware(loginValidation), loginUser);

router.post("/logout", logOutUser);

export default router;
