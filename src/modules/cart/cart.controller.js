import CartService from "./cart.service";
import ApiResponse from "../../utils/ApiResponse.utility.js";

export const createCart = async (req, res, next) => {
  // Get validated req data
  const cartData = req.validatedCartReqData; //we will get productId and quantity

  const userId = req.user._id; //this is User's Id

  const checkProductAndUpdate = await CartService.createCartService(
    cartData,
    userId
  );

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        "Cart Created / Updated Successfully !",
        checkProductAndUpdate
      )
    );
  //We are returning the object of Cart , updated / or newly created.
};
