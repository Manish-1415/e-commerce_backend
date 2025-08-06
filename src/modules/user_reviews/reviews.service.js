import ApiError from "../../utils/ApiError.utility.js";
import { Product } from "../product/product.model.js";
import { Review } from "./reviews.model.js";

// Logics needs to be twick a little bit , because we have added reviews model

const ReviewsService = {
  createReviewService: async (userPayload, productId, validatedUserData) => {
    // Find the product first
    let findProduct = await Product.findById(productId);

    if (!findProduct) throw new ApiError(404, "Product Not Found");

    // If we have that product then check if the logged in user have created a review or not

    let checkIfUserHaveReviewed = await Review.findOne({
      user: userPayload._id,
      product: productId,
    });

    if (checkIfUserHaveReviewed)
      throw new ApiError(400, "U already reviewed this product");

    const newReviewCreation = await Review.create({
      product: productId,
      user: userPayload._id,
      name: userPayload.name,
      rating: validatedUserData.rating,
      comment: validatedUserData.comment,
    });

    const reviewCount = await Review.countDocuments({ product: productId });

    findProduct.numOfReviews = reviewCount;
    await findProduct.save();

    return {
      review: newReviewCreation,
      reviewCount: reviewCount,
    };
  },

  deleteReviewService: async (userPayload, productId) => {
    // Find the product first
    let findProduct = await Product.findById(productId);

    if (!findProduct) throw new ApiError(404, "Product Not Found");

    // If we have product now check if user have review about this product if not then throw error.

    const findReview = await Review.findOne({
      user: userPayload._id,
      product: productId,
    });

    if (!findReview)
      throw new ApiError(400, "You did not Reviewed this product yet");

    //Here now onwards , what will happen is if user have created a review about that same product now delete the product

    const userReviewIdToBeDeleted = findReview._id;

    const findTheReviewAndDelete = await Review.findByIdAndDelete(
      userReviewIdToBeDeleted
    );

    const totalReviews = await Review.countDocuments({ product: productId });
    findProduct.numOfReviews = totalReviews;
    await findProduct.save();

    return {
      deletedReview: findTheReviewAndDelete,
      totalReviews,
    };
  },

  updateReviewService: async (productId, userPayload, updatedDataFromUser) => {
    // Find the product first
    const findProduct = await Product.findById(productId);

    if (!findProduct) throw new ApiError(404, "Product Not Found");

    // if product exists then check if user have review on this product

    let findIsUserReviewed = await Review.findOne({
      user: userPayload._id,
      product: productId,
    });

    if (!findIsUserReviewed)
      throw new ApiError(400, "You did not reviewed the product yet");

    // If we have product & user reviewed it now let user update the review .
    findIsUserReviewed.rating = updatedDataFromUser.rating;
    findIsUserReviewed.comment = updatedDataFromUser.comment;

    await findIsUserReviewed.save();

    return findIsUserReviewed;
  },

  getAllReviews: async (productId, skip, limit) => {
    // Get all the reviews which are related to this productId
    const getAllReviewOfThisProduct = await Review.find({ product: productId })
      .populate("user", "name")
      .skip(skip)
      .limit(limit)
      .lean();

    return getAllReviewOfThisProduct;
  },
};

export default ReviewsService;
