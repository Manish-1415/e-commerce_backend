import { Router } from "express";
import { createNewAccessToken, loginUser , logOutUser} from "./auth.controller.js";
import { loginValidation, loginValidationMiddleware } from "./auth.validation.js";

const router = Router();

router.post("/login", loginValidationMiddleware(loginValidation), loginUser);

router.post("/logout", logOutUser);

router.post("/refresh", createNewAccessToken);

export default router;
