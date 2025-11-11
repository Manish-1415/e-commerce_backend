import asyncHandler from "../../utils/asyncHandler.utility";
import cartService from "./cart.service";
import ApiResponse from "../../utils/ApiResponse.utility";

export const createCart = asyncHandler(async (req, res) => {
  const productInfoObj = req.validatedCartSchema; // the product id & the quantity
  const createUserCart = await cartService.createCartForUser(
    productInfoObj,
    req.user
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Cart created successfully !", createUserCart));
});

export const updateCart = asyncHandler(async (req, res) => {
  //what to send in a service ? productId & quantity here also
  const updatedCart = await cartService.updateCartForUser(req.validatedCartSchema, req.user);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Cart Updated / Created New product in Cart successful",
        updatedCart
      )
    );
});


export const deleteProductFromCart = asyncHandler(async (req , res) => {
    // what we have to do ? we will get specific id of an product when the delete icon is clicked , we will get id of product
    const productId = req.params.id;
    const deletedProduct = await cartService.deleteProduct(productId , req.user);

    return res
    .status(200)
    .json(new ApiResponse(200 , "product is deleted from cart", deletedProduct));
})


export const getCart = asyncHandler(async (req , res) => {
  // user will get the req 
  const cartToSend = await cartService.getCartForUser(req.user);

  return res
  .status(200)
  .json(new ApiResponse(200 , "Cart data fetched successfully !", cartToSend));
})

