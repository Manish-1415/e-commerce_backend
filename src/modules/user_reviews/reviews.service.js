import ApiError from "../../utils/ApiError.utility.js";
import { Product } from "../product/product.model.js";

const ReviewsService = {
  createReviewService: async (userPayload, productId, validatedUserData) => {
    // Check product first
    let findProduct = await Product.findById(productId);

    if (!findProduct)
      throw new ApiError(400, "Product is Invalid / Not Present");

    // Now check if user have already reviewed or not the product

    const checkIfUserAlreadyReviewed = findProduct.reviews.find(
      (review) => review.user._id.toString() === userPayload._id
    );

    if (checkIfUserAlreadyReviewed)
      throw new ApiError(400, "User cannot review a Product more than 1 time");

    // But if user not reviewed a product then let him create the review

    const createNewReview = {
      user: userPayload._id,
      name: userPayload.name,
      rating: validatedUserData.rating,
      comment: validatedUserData.comment,
    };

    // Now push the review inside reviews array

    findProduct.reviews.push(createNewReview); //push returns updated arr length

    await findProduct.save();

    const reviewCount = findProduct.reviews.length;

    return {
      review: createNewReview,
      reviewCount: reviewCount,
    };
  },

  deleteReviewService: async (userPayload, productId) => {
    // Find the product first
    let findProduct = await Product.findById(productId);

    if (!findProduct) throw new ApiError(400, "Product is invalid , Not exist");

    // if u have product then check if user have reviewed or not , if not reviewed then throw err

    const checkIfUserReviewed = findProduct.reviews.find(
      (review) => review.user._id.toString() === userPayload._id
    );

    if (!checkIfUserReviewed)
      throw new ApiError(
        400,
        "User cannot delete a review if user dont reviewed"
      );

    // But if user reviewed then delete the review now

    const newFilteredReviewsArr = findProduct.reviews.filter(
      (review) => review.user._id.toString() !== userPayload._id
    );

    // Now update the reviews arr
    findProduct.reviews = newFilteredReviewsArr;

    await findProduct.save();

    // Calculate total reviews

    const totalReviews = findProduct.reviews.length;

    return {
      reviews: newFilteredReviewsArr,
      totalReviews,
    };
  },

  updateReviewService: async (productId, userPayload, updatedDataFromUser) => {
    // Find the product first if it exist
    let findProduct = await Product.findById(productId);

    if (!findProduct) throw new ApiError(400, "Product is Invalid , Not Exist");

    // Check if user reviewed , if not then dont let him update

    const checkIfUserHaveReview = findProduct.reviews.find(
      (review) => review.user._id.toString() === userPayload._id
    );

    if (!checkIfUserHaveReview)
      throw new ApiError(
        400,
        "User cannot update review , if user dont have review"
      );

    checkIfUserHaveReview.rating = updatedDataFromUser.rating;
    checkIfUserHaveReview.comment = updatedDataFromUser.comment;

    await findProduct.save();

    return findProduct;
  },

  getAllReviews: async (productId) => {
    const findProduct = await Product.findById(productId)
      .select("reviews.user", "_id , name")
      .lean();

    if (!findProduct)
      throw new ApiError(400, "Product is Invalid / product does not exist");

    return findProduct.reviews;
  },
};

export default ReviewsService;
