import asyncHandler from "../../utils/asyncHandler.utility"
import adminService from "./admin.service"
import ApiResponse from "../../utils/ApiResponse.utility"

export const getAllUsers = asyncHandler(async (req , res) => {
    const users = await adminService.getUsers();
    
    return res
    .status(200)
    .json(new ApiResponse(200 , "Users Fetched From DB", users));
})

export const getSingleUser = asyncHandler( async(req , res) => {
    const user = adminService.getUser(req.params.id);

    return res
    .status(200)
    .json(new ApiResponse(200 , "User fetched from DB", user));
})


export const getAllOrders = asyncHandler( async(req , res) => {
    const orders = await adminService.getOrders();

    return res
    .status(200)
    .json(new ApiResponse(200 , "Orders fetched successfully !", orders));
})


export const getSingleOrder = asyncHandler( async(req , res) => {
    const order = await adminService.getOrder(req.params.id);

    return res
    .status(200)
    .json(new ApiResponse(200 , "Order fetched successfully !", order));
} )


export const deleteUser = asyncHandler(async (req , res) => {
    const user = await adminService.deleteSingleUser(req.params.id);

    return res
    .status(200)
    .json(new ApiResponse(200 , "User deleted successfully !", user));
})


export const deleteOrder = asyncHandler(async (req , res) => {
    const order = await adminService.deleteSingleOrder(req.params.id);

    return res
    .status(200)
    .json(new ApiResponse(200, "Order deleted successfully !", order));
})

export const updateOrder = asyncHandler(async (req , res) => {
    const orderStatus = req.body;

    const order = await adminService.updateSingleOrder(req.params.id , orderStatus);

    return res
    .status(200)
    .json(new ApiResponse(200 , "Order update successful", order));
})