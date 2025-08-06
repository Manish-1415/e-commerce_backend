import ApiError from "../../utils/ApiError.utility.js";
import { Product } from "../product/product.model.js";
import ApiResponse from "../../utils/ApiResponse.utility.js";

export const createReview = async (req, res, next) => {
  try {
    // we will get three things , product id , user id , data from user
    const productId = req.params.id;
    const userId = req.user._id;
    const reviewDataFromUser = req.validatedReviewBody;

    // Check first if user have created a review first
    let getProductById = await Product.findById(productId);

    if (!getProductById)
      throw new ApiError(400, "Product not found For reviews Operation");

    // If we get product check if user have created a review before , if not then let him , if yes then throw error

    let checkIfUserAlreadyReviewed = getProductById.reviews.find(
      (review) => review.user._id.toString() === userId.toString()
    );

    if (checkIfUserAlreadyReviewed)
      throw new ApiError(400, "One user can review only once");

    // Now till here we have get the product , then checked if user reviewed before , now here we will update the review.

    const newReviewObj = {
      user: userId,
      name: getProductById.name,
      rating: reviewDataFromUser.rating,
      comment: reviewDataFromUser.comment,
    };

    // Now we have successfully created review obj pass it to the reviews array

    getProductById.reviews.push(newReviewObj);

    await getProductById.save();

    // Now add total reviews , how many reviews we got for a product

    const totalReviewsCount = getProductById.reviews.length;

    return res.status(201).json(
      new ApiResponse(201, "Review Created Successfully", {
        getProductById,
        totalReviews: totalReviewsCount,
      })
    );
  } catch (error) {
    console.log("Review Error : ", error);
    throw new ApiError(500, error);
  }
};

export const deleteReview = async (req, res, next) => {
  const userId = req.user._id;
  const productId = req.params.id;

  // First find the Product
  let getProduct = await Product.findById(productId);

  if (!getProduct)
    throw new ApiError(400, "Product Not Found for delete Operation");

  // Now if we have product check if user have created a review or not ,

  let checkIfUserAlreadyReviewed = getProduct.reviews.find(
    (review) => review.user._id.toString() === userId.toString()
  );
  // What this checks this check if logged in user have a review or not

  if (!checkIfUserAlreadyReviewed)
    throw new ApiError(
      404,
      "User cannot delete review cause he never created one"
    );

  const newReviewArr = getProduct.reviews.filter(
    (review) => review.user._id.toString() !== userId.toString()
  );

  getProduct.reviews = newReviewArr;

  await getProduct.save();

  const totalReviewsCount = getProduct.reviews.length;

  return res.status(200).json(
    new ApiResponse(200, "Review Deleted Successfully !", {
      newReviewArr,
      totalReviews: totalReviewsCount,
    })
  );
};
