import Order from "../order/order.model.js";
import ApiError from "../../utils/ApiError.utility.js";
import { User } from "../user/user.model.js";

const AdminService = {
  getAllOrders: async () => {
    const findAllOrdersAndSend = await Order.find();

    if (!findAllOrdersAndSend) throw new ApiError(400, "Orders cannot get");

    return findAllOrdersAndSend;
  },


  setOrderStatus : async (orderId , newOrderStatus) => {
    // Find the Order first
    let getOrderById = await Order.findById(orderId);

    if(!getOrderById) throw new ApiError(400 , "Order does not valid / not exist");

    getOrderById.status = newOrderStatus;

    await getOrderById.save();

    return getOrderById;
  },



  getOrderDetails : async (orderId) => {
    const getOrderByItsId = await Order.findById(orderId);

    if(!getOrderByItsId) throw new ApiError(400 , "Order Not Found to get Details");

    return getOrderByItsId;
  },


  getUsersForAdmin : async () => {
    // Find If we have users
    const findUsers = await User.find();

    if(!findUsers) throw new ApiError(400 , "No Users Present Until Now");

    return findUsers;
  },


  getUserByIdForAdmin : async (getUserById) => {
    // find the user first
    const findUser = await User.findById(getUserById);

    if(!findUser) throw new ApiError(400 , "User not exist");

    return findUser;
  }
};

export default AdminService;
