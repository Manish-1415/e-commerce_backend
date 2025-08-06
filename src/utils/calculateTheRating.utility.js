import { Product } from "../modules/product/product.model.js";
import { Review } from "../modules/user_reviews/reviews.model";
import ApiError from "./ApiError.utility.js";

const calculateTheRating = async (ProductId) => {
  const findTheProduct = await Product.findById(ProductId);
  if (!findTheProduct) throw new ApiError(404, "Product not found");

  const getAllReviews = await Review.find({ product: ProductId });
  if (!getAllReviews) throw new ApiError(404, "Review Not Found");

  const totalReviews = getAllReviews.length;

  if (totalReviews === 0) throw new ApiError(400, "No Reviews Till Now");

  const calculateTotalRating = getAllReviews.reduce(
    (acc, review) => acc + review.rating,
    0
  );

  const evaluateTheTotalRating = Number(
    (calculateTotalRating / totalReviews).toFixed(1)
  );

  return evaluateTheTotalRating;
};

export default calculateTheRating;
