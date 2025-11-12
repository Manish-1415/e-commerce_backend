import asyncHandler from "../../utils/asyncHandler.utility.js";
import orderService from "./order.service.js";
import ApiResponse from "../../utils/ApiResponse.utility.js";

export const createOrder = asyncHandler(async (req, res) => {
  const orderInfoObj = req.body;
  const userInfoObj = req.user;
  const order = await orderService.createOrderForUser(
    orderInfoObj,
    userInfoObj
  );

  return res
    .status(201)
    .json(new ApiResponse(201, "Order Created Successfully !", order));
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const orders = await orderService.getAllOrdersForUser(userId);

  return res
    .status(200)
    .json(new ApiResponse(200, "Orders Fetched Successfully !", orders));
});

export const getSpecificOrder = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;

  const order = await orderService.getOrderForUser(productId, userId);

  return res
    .status(200)
    .json(new ApiResponse(200, "Order fetched successfully !", order));
});


export const cancelTheOrder = asyncHandler(async(req , res) => {
    const productId = req.params.id;
    const userId = req.user.id;

    const cancelledOrder = await orderService.cancelSpecificOrder(productId , userId);

    return res
    .status(200)
    .json(new ApiResponse(200 , "Order Cancelled Successfully !", cancelledOrder));
})