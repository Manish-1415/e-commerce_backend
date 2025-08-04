import AdminService from "./admin.service";
import ApiResponse from "../../utils/ApiError.utility.js";
import { User } from "../user/user.model.js";
import { Order } from "../order/order.model.js";

export const getAllOrdersForAdmin = async (req, res, next) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Calculate the entries from collection
  const totalCountOfOrders = await Order.countDocuments();
  const totalPages = Math.ceil(totalCountOfOrders / limit); // This will show frontend , that this many pages we have

  // Now give all orders to the Admin
  const getOrdersForAdmin = await AdminService.getAllOrders(limit, skip);
  return res.status(200).json(
    new ApiResponse(200, "All the Orders For Admin", {
      orders: getOrdersForAdmin,
      currentPage: page,
      totalPages,
    })
  );
};

export const updateSpecificOrderStatus = async (req, res, next) => {
  // here we simply want to change the status of an order
  const orderId = req.params.id;
  const newOrderStatus = req.validatedReqBodyForOrderStatus;

  const setNewOrderStatus = await AdminService.setOrderStatus(
    orderId,
    newOrderStatus
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "New Orders Status saved successfully !",
        setNewOrderStatus
      )
    );
};

export const getDetailsOfOrder = async (req, res, next) => {
  // By this controller admin will get the Order and send it
  const orderId = req.params.id;

  const getOrderDetails = await AdminService.getOrderDetails(orderId);

  return res
    .status(200)
    .json(new ApiResponse(200, "Oder fetched Successfully !", getOrderDetails));
};

export const getUsersForAdmin = async (req, res, next) => {
  // Added Pagination
  const page = Number(req.query.page) || 1; // by default 1 but generally came from frontend
  const limit = Number(req.query.limit) || 10; //limit of content a page can have
  const skip = (page - 1) * limit; // it calculates for how many entries a page can skip

  const getUsers = await AdminService.getUsersForAdmin(limit, skip);

  const totalCountOfUsers = await User.countDocuments(); // this will count how many entrys/documents we have about
  const totalPages = Math.ceil(totalCountOfUsers / limit); // this will divide entries with limit , like suppose we have 389 entries & limit 10
  // then 389 / 10 = 38; So for 389 entries we will need 39 pages

  return res.status(200).json(
    new ApiResponse(200, "All Users fetched For Admin", {
      users: getUsers,
      currentPage: page,
      totalPages,
    })
  );
};

export const getUserById = async (req, res, next) => {
  const getUserId = req.params.id;

  const getSpecificUser = await AdminService.getUserByIdForAdmin(getUserId);

  return res
    .status(200)
    .json(new ApiResponse(200, "User Found By Id", getSpecificUser));
};
