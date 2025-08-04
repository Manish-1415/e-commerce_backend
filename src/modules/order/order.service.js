import ApiError from "../../utils/ApiError.utility";
import { Cart } from "../cart/cart.model";
import { Product } from "../product/product.model";
import { Order } from "./order.model";

const OrderService = {
  createOrderService: async (shippingDataFromUser, userId) => {
    // Now here u will get the shipping data and users Id now create Order
    let findIfUserHaveCart = await Cart.findOne({ user: userId });

    if (!findIfUserHaveCart)
      throw new ApiError(400, "Please Create Cart First");
    // No need of this but still using

    // Find the Product To give the name to the name field ,
    // So here we have to find the each product by its id , but why ? because we have to provide name of that product inside name field , but why ? because when we set the orderItems array we will be giving a structure just like the model expects it.

    let fetchTheProduct = async (productId) => {
      let fetchProduct = await Product.findOne({ _id: productId });
      if (!fetchProduct)
        throw new ApiError(400, "Product Not Found To Perform This Operation");
      return fetchProduct.name;
    };

    // orderItemsArrayFromCartItems will have [{} , {}] array of objects , like the objects we will need to provide into the DB in field of orderItemsArray so that's why we are iterating over those items from Cart.

    // Why Promise.all() ? Because .map() is synchronous method , but we have to make it await for name key/value , for dynamically getting the name from product.name . And if .map() cant work async so we have to make sure , that first await Promise.all(); , it is saying i am waiting for every promise to resolve first then give me the exact array.
    const orderItemsArrayFromCartItems = await Promise.all(
      findIfUserHaveCart.items.map(async (product) => {
        return {
          product: product.product._id,
          name: await fetchTheProduct(product.product._id),
          quantity: product.quantity,
          price: product.price,
        }; //Ok so here the orderItemsArray will be done for each product from Cart
      })
    );

    // Now for OrderItems logic is done, now we will move towards the pricing section
    const itemsPrice = findIfUserHaveCart.items.reduce(
      (acc , item) => acc + item.quantity * price,
      0
    );
    //By this reduce method we will get exact price of all the items inside in the Cart

    const taxPrice = Number((itemsPrice * 0.18).toFixed(2)); // toFixed(2) returns string by 2 decimal points , we will make it Number by . Number Constructor

    const shippingPrice = 50;

    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    const createObjForOrder = {
      user: userId,
      orderItems: orderItemsArrayFromCartItems,
      phoneNo: shippingDataFromUser.phoneNumber,
      shippingAddress: shippingDataFromUser.shippingAddress,
      paymentMethod: shippingDataFromUser.paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    };

    // Now create Order Entry In DB.

    const createEntryOfOrder = await Order.create(createObjForOrder);

    if (!createEntryOfOrder)
      throw new ApiError(500, "Error Occurred while Creating Order");


    // Clear the cart now
    findIfUserHaveCart.items = [];

    await findIfUserHaveCart.save();

    return createEntryOfOrder;
  },




  getUserOrders : async (userId) => {
    // Find Orders from UserId 
    const findOrderForUser = await Order.find({user : userId});

    if(!findOrderForUser) throw new ApiError(404 , "No Order Found for User");

    // if user have orders then send it

    return findOrderForUser;

  },


};

export default OrderService;
