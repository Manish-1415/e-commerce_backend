import ApiError from "../../utils/ApiError.utility.js";
import { Cart } from "../cart/cart.model.js";
import { Product } from "../product/product.model.js";
import { Order } from "./order.model.js";

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
      (acc, item) => acc + item.quantity * item.price,
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

    // After the Order is created , now order is place so reduct the quantity of stock from Product .
    // what i can do here is , i have created an Order / placed and Order , so from that order the orderItems array i will do for each item find the product & from the quantity of stock i will minus the current quantity
    // So new array from map , inside map i will call a function pass the id of that product find its stock if not 0 then simply minus some quantity and update the product then 

    // For every product call this function and provide updated stock

    //  This is inventory logic , for stock updation dynamically , after every order placed.
    const findTheProductAndUpdateTheStock = async (productId , productQuantity) => {
      let getProduct = await Product.findById(productId);

      if(!getProduct) throw new ApiError(400 , "Product not found , for quantity change");

      if(getProduct.stock <= 0) throw new ApiError(400 , "Product is Out Of stock , User can't get that");

      if(getProduct.stock < productQuantity) throw new ApiError(400 , "User cannot place the Order , because Stock of this Product is not placable");

      getProduct.stock -= productQuantity;
      await getProduct.save();  // Here that Product Quantity will be overwrite, this function will run for every single Product in the Order
    }


    const takeTheProductAndUpdateStockQuantity = await Promise.all(createEntryOfOrder.orderItems.map( async (product) => {
      // First take the quantity from the product 
      const productId = product.product._id;
      const productQuantity = product.quantity;
      // Now for every product i have take the id and quantity now pass it inside that function

      const sendIdAndQuantity = await findTheProductAndUpdateTheStock(productId , productQuantity);
      //  Consider only success will come , because we have already handle the errors      
    } )
  );



    // Clear the cart now
    findIfUserHaveCart.items = [];

    await findIfUserHaveCart.save();

    return createEntryOfOrder;
  },

  getUserOrders: async (userId) => {
    // Find Orders from UserId
    const findOrderForUser = await Order.find({ user: userId }).select(
      "orderItems totalPrice orderStatus"
    );

    if (!findOrderForUser) throw new ApiError(404, "No Order Found for User");

    // if user have orders then send it

    return findOrderForUser;
  },

  getUserOrderById: async (orderId) => {
    const checkIfOrderIsInResource = await Order.findById(orderId);

    if (!checkIfOrderIsInResource)
      throw new ApiError(400, "Provided Id of Order is Invalid");

    return checkIfOrderIsInResource;
  },
};

export default OrderService;
