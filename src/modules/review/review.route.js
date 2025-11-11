import { Router } from "express";
import verifyUser from "../../middlewares/jwt.middleware"
import checkUserRole from "../../middlewares/checkIfRoleIsUser.middleware";
import { reviewValidationMiddleware } from "./review.validation";
import { createReview } from "./review.controller";

const router = Router();

router.post("/", verifyUser , checkUserRole , reviewValidationMiddleware , createReview );

export default router;