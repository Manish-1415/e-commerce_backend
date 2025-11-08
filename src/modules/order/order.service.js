import ApiError from "../../utils/ApiError.utility";
import { Order } from "./order.model";

const orderService = {
  createOrderForUser: async (orderInfoObj, userObjWithPayload) => {
    // what i have to do is everything else is done , now simply u have to just create an Order

    //then simply create one object
    const orderObj = {
      user: userObjWithPayload.id,
      items: [
        {
          product: orderInfoObj.items.product,
          quantity: orderInfoObj.items.quantity,
          price: orderInfoObj.items.price,
        },
      ],
      shippingAddress: {
        fullname: orderInfoObj.fullname,
        address: orderInfoObj.address,
        state: orderInfoObj.state,
        city: orderInfoObj.city,
        postalCode: orderInfoObj.postalCode,
        country: orderInfoObj.country,
        phone: orderInfoObj.phone,
      },
      paymentMethod: orderInfoObj.paymentMethod,
      paymentStatus: orderInfoObj.paymentStatus,
      orderStatus: orderInfoObj.orderStatus,
      totalAmount: orderInfoObj.totalAmount,
    };

    //now object is created just simply create an order

    const generateOrder = await Order.create(orderObj);

    if (!generateOrder)
      throw new ApiError(500, "Error Occurred while creating an Order");

    return generateOrder;
  },

  getAllOrdersForUser: async (userId) => {
    const getOrders = await Order.find({ user: userId });

    if (!getOrders) return [];

    return getOrders;
  },

  getOrderForUser: async (productId, userId) => {
    let findForOrder = await Order.findOne({
      user: userId,
      "items.product": productId,   //why we use string here , because mongo methods need obj not every method but of this needs it. so what happens is findOne checks for specific obj , so find a obj which user is userId & items.produc is productId but in string , use that in nesting.
    });

    if (!findForOrder) throw new ApiError(400, "Order is not present");

    return findForOrder;
  },

  cancelSpecificOrder : async (productId , userId) => {
    // first find the order with productId & userId

    let findTheOrder = await Order.findOne({user : userId , "items.product" : productId});

    if(!findTheOrder) throw new ApiError(404 , "Order Not Found");

    if(findTheOrder.orderStatus === "Delivered" || findTheOrder.orderStatus === "Cancelled") 
        throw new ApiError(400 , "Product Cannot be cancelled"); // this is needed , both frontend & backend needs to verify things , cause those are vulnerable for hacker

    return await Order.findByIdAndDelete(findTheOrder._id);
  }
};

export default orderService;
