import AdminService from "./admin.service";
import ApiResponse from "../../utils/ApiError.utility.js";

export const getAllOrdersForAdmin = async (req, res, next) => {
  // Now give all orders to the Admin
  const getOrdersForAdmin = await AdminService.getAllOrders();
  return res
    .status(200)
    .json(new ApiResponse(200, "All the Orders For Admin", getOrdersForAdmin));
};



export const updateSpecificOrderStatus = async (req , res , next) => {
    // here we simply want to change the status of an order
    const orderId = req.params.id;
    const newOrderStatus = req.validatedReqBodyForOrderStatus;

    const setNewOrderStatus = await AdminService.setOrderStatus(orderId , newOrderStatus);
    
    return res
    .status(200)
    .json(new ApiResponse(200 , "New Orders Status saved successfully !" , setNewOrderStatus));
}