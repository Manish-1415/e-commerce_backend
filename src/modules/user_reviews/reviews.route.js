import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { createReview, deleteReview } from "./reviews.controller.js";
import { reviewSchema } from "./reviews.validation.js";
import { validateReviewSchema } from "./reviews.validation.js";

const router = Router();

router.route("/product/:id").post(authMiddleware , validateReviewSchema(reviewSchema) , createReview);

router.route("/product/:id").delete(authMiddleware , deleteReview)





export default router;
// what we need first thing right now is , a schema for reviews by JOI make it from gpt 
// Schema & validation middleware is done now , next thing is , check if user have already created a review before 
