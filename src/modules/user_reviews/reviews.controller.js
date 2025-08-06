import ApiResponse from "../../utils/ApiResponse.utility.js";
import ReviewsService from "./reviews.service.js";

export const createReview = async (req, res, next) => {
  const userPayload = req.user;
  const productId = req.params.id;
  const validatedUserData = req.validatedReviewBody;

  const createReviewForUser = await ReviewsService.createReviewService(
    userPayload,
    productId,
    validatedUserData
  );

  return res
    .status(201)
    .json(
      new ApiResponse(201, "Review Created Successfully", createReviewForUser)
    );
};

export const deleteReview = async (req, res, next) => {
  const userPayload = req.user;
  const productId = req.params.id;

  const deleteReview = await ReviewsService.deleteReviewService(
    userPayload,
    productId
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Review deleted successfully !", deleteReview));
};

export const updateReview = async (req, res, next) => {
  const productId = req.params.id;
  const userPayload = req.user;
  const updatedDataFromUser = req.validatedReviewBody;

  const updateReview = await ReviewsService.updateReviewService(
    productId,
    userPayload,
    updatedDataFromUser
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "User updated Successfully !", updateReview));
};

export const getAllReviewForAProduct = async (req, res, next) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const productId = req.params.id;

  const reviewArray = await ReviewsService.getAllReviews(
    productId,
    skip,
    limit
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Reviews for the Product fetched", reviewArray));
};
