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



export const getDetailsOfOrder = async (req , res , next) => {
    // By this controller admin will get the Order and send it
    const orderId = req.params.id;

    const getOrderDetails = await AdminService.getOrderDetails(orderId);

    return res
    .status(200)
    .json(new ApiResponse(200 , "Oder fetched Successfully !", getOrderDetails));
}

 
export const getUsersForAdmin = async (req , res , next) => {
    const getUsers = await AdminService.getUsersForAdmin();

    return res
    .status(200)
    .json(new ApiResponse(200 , "All Users fetched For Admin", getUsers));
}


export const getUserById = async (req , res , next) => {
    const getUserId = req.params.id;

    const getSpecificUser = await AdminService.getUserByIdForAdmin(getUserId);

    return res
    .status(200)
    .json(new ApiResponse(200 , "User Found By Id", getSpecificUser));
}


