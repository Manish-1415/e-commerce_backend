import CartService from "./cart.service";
import ApiResponse from "../../utils/ApiResponse.utility.js";

export const createCart = async (req, res, next) => {
  // For creating Cart even or even if it is exist we will get productId and quantity from the body itself , because we are on product listing page not on Cart Page so route will be /cart/  here we will add product or create cart , quantity update we will get that from the body itself.

  // Get validated req data
  const cartData = req.validatedCartReqData; //we will get product quantity only

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

export const updateCart = async (req, res, next) => {
  // Here we need productId from the params because this is Cart page and update route will be called if anything changes
  const userId = req.user._id; //payload Id from auth middleware
  const cartData = req.validatedCartReqData;
  const productId = req.params.id;

  const updateCartById = await CartService.updateCartService(
    userId,
    cartData,
    productId
  );

  // send the response to user

  return res
    .status(203)
    .json(new ApiResponse(203, "Cart Updated Successfully !", updateCartById));
};

export const deleteProductFromCart = async (req, res, next) => {
  const productId = req.params.id;
  const userId = req.user._id;

  const deleteProduct = await CartService.deleteProductService(
    productId,
    userId
  );

  return res
    .status(204)
    .json(
      new ApiResponse(
        204,
        "product deleted from cart successfully !",
        deleteProduct
      )
    );
};



export const getCart = async (req , res , next) => {
  const userId = req.user._id;

  const getCartWithItems = await CartService.getCartService(userId);

  return res
  .status(200) 
  .json(new ApiResponse(200 , "Cart Sent Successfully to Frontend", getCartWithItems));
}