import ApiError from "../../utils/ApiError.utility";
import Cart from "./cart.model.js";
import Product from "../product/product.model.js";

const CartService = {
  createCartService: async (cartData, userId) => {
    // We have to find Cart By User's Id
    let findCartById = await Cart.findOne({ user: userId }); //find the cart by usersId , user is the field and userId is the Users Id

    // SO this scenario is for if Cart is not for Specific User

    // We have to find That product for dynamically update Price
    const findProduct = await Product.findById(cartData.productId);
    if (!findProduct) throw new ApiError(400, "Product Not Found / Invalid ID");

    if (!findCartById) {
      const createCartForUser = await Cart.create({
        user: userId,
        items: [
          {
            product: cartData.productId,
            quantity: cartData.productQuantity,
            price: findProduct.price,
          },
        ],
      });

      if (!createCartForUser)
        throw new ApiError(500, "Error Occurred while creating Cart");

      return createCartForUser; //Created Cart will be send
    }

    //If Cart Already Created

    const findIfProductAlreadyExists = findCartById.items.find(
      (product) =>
        product.product._id.toString() === cartData.productId.toString()
    );
    // With this method we are finding if Cart have that product or not already
    // And by find now findIfProductAlreadyExists this variable consist the Object which is already there so update it now
    if (findIfProductAlreadyExists) {
      // Here product will already exist in Cart now update the quantity
      findIfProductAlreadyExists.quantity += cartData.productQuantity; //Updated the existing quantity with productData quantity
    }

    // Now if that product not exist already then we have to create new Object , we get that productId from User , and earlier we simply take that product id and find the product from DB , now we have to add that product into Cart
    else {
      const newProduct = {
        product: findProduct._id,
        quantity: cartData.productQuantity,
        price: findProduct.price,
      };

      findCartById.items.push(newProduct); //Now this object will be pushed at the last

      await findCartById.save();
    }

    // Now calculate total items and total price of the cart items

    findCartById.totalItems = findCartById.items.reduce(
      (acc, product) => acc + product.quantity,
      0
    );
    // It will iterate over every products quantity and then in the end it will persist single value
    findCartById.totalPrice = findCartById.items.reduce(
      (acuumulator, product) => acuumulator + product.price * product.quantity,
      0
    ); //By reduce i simply make whole condition into one single value
    // How this works is , reduce will have 2 things accumulator which is starting value of result , and we add that with our condition , and for first item it is 0 , by that condition it will get the real value now that real value will be stored inside accumulator , and after that we will used to add next element value with accumulator

    await findCartById.save();

    return findCartById;
  },
};

export default CartService;
