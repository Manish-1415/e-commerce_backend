import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { createReview, deleteReview, getAllReviewForAProduct, updateReview } from "./reviews.controller.js";
import { reviewSchemaForCreation, reviewSchemaForUpdation } from "./reviews.validation.js";
import { validateReviewSchema } from "./reviews.validation.js";

const router = Router();

router.route("/product/:id").post(authMiddleware , validateReviewSchema(reviewSchemaForCreation) , createReview);

router.route("/product/:id").delete(authMiddleware , deleteReview);

router.route("/product/:id")/patch(authMiddleware , validateReviewSchema(reviewSchemaForUpdation)  , updateReview);

router.route("/product/:id").get(getAllReviewForAProduct);





export default router;
// what we need first thing right now is , a schema for reviews by JOI make it from gpt 
// Schema & validation middleware is done now , next thing is , check if user have already created a review before 
