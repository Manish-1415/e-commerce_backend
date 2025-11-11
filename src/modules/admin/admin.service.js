import { User } from "../user/user.model"
import ApiError from "../../utils/ApiError.utility"
import { Order } from "../order/order.model";

const adminService = {
    getUsers : async () => {
        const users = await User.find();

        if(!users) return [];

        return users;
    },

    getUser : async (userId) => {
        const findUserById = await User.findById(userId);

        if(!findUserById) throw new ApiError(400 , "Admin User Not Present In DB");

        return findUserById;
    },

    getOrders : async function() {
        const findTheOrder = await Order.find();

        if(!findTheOrder) return [];

        return findTheOrder;
    },

    getOrder : async function (orderId) {
        const findTheOrder = await Order.findById(orderId);

        if(!findTheOrder) throw new ApiError(404 , "Admin This Order is not present in DB");

        return findTheOrder;
    },

    deleteSingleUser : async (userId) => {
        const findTheUserAndDelete = await User.findByIdAndDelete(userId);

        if(!findTheUserAndDelete) throw new ApiError(500 , "Admin Error occurred while deleting user");

        return findTheUserAndDelete;
    },

    deleteSingleOrder : async (orderId) => {
        const findOrderAndDelete = await Order.findByIdAndDelete(orderId);

        if(!findOrderAndDelete) throw new ApiError(500 , "Admin Error Occurred while deleting order");

        return findOrderAndDelete;
    },

    updateSingleOrder : async (orderId , orderStatus) => {
        let findOrderAndUpdate = await Order.findByIdAndUpdate(orderId , { orderStatus });

        if(!findOrderAndUpdate) throw new ApiError(500 , "Admin Error Occurred while updating order");

        return findOrderAndUpdate;
    }
}

export default adminService;