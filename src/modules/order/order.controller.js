import OrderService from "./order.service";
import ApiResponse from "../../utils/ApiResponse.utility.js";

export const createOrder = async (req, res, next) => {
  const shippingDataFromUser = req.validatedOrderData;
  const userId = req.user._id;

  const createOrder = await OrderService.createOrderService(
    shippingDataFromUser,
    userId
  );

  return res
    .status(201)
    .json(new ApiResponse(201, "Order Placed Successfully ", createOrder));
};

export const getMyOrders = async (req, res, next) => {
  const userId = req.user._id;

  const getUsersOrder = await OrderService.getUserOrders(userId);

  return res
    .status(200)
    .json(new ApiResponse(200, "This are Users Order", getUsersOrder));
};

export const getMyOrderById = async (req, res, next) => {
  const orderId = req.params.id;
  // I have not used the Id of loggedIn user cause i will be checking the ownership from our ownershipcheck middleware
  const getOrderById = await OrderService.getUserOrderById(orderId);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Order get from DB now sending to user (single order)",
        getOrderById
      )
    );
};
