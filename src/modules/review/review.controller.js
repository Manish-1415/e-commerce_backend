import asyncHandler from "../../utils/asyncHandler.utility.js"
import reviewService from "./review.service.js";
import ApiResponse from "../../utils/ApiResponse.utility.js"

export const createReview = asyncHandler(async(req , res) => {
    const reviewDataObj = req.body;
    const userId = req.user.id;
    const productId = req.params.id;

    const review = await reviewService.createReviewForUser(reviewDataObj , userId , productId);

    return res
    .status(201)
    .json(new ApiResponse(201 , "Review Created Successfully!", review));
})