import OrderService from "./order.service";

export const createOrder = async (req , res , next) => {
    const shippingDataFromUser = req.validatedOrderData;
    const userId = req.user._id;
    
    const createOrder = await OrderService.createOrderService(shippingDataFromUser , userId);
}