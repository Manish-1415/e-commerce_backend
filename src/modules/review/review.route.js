import { Router } from "express";
import verifyUser from "../../middlewares/jwt.middleware.js"
import checkUserRole from "../../middlewares/checkIfRoleIsUser.middleware.js";
import { reviewValidationMiddleware } from "./review.validation.js";
import { createReview } from "./review.controller.js";

const router = Router();

router.post("/", verifyUser , checkUserRole , reviewValidationMiddleware , createReview );

export default router;