import ApiError from "../../utils/ApiError.utility.js";
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
      let createCartForUser = await Cart.create({
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

      createCartForUser.totalItems = createCartForUser.items.reduce(
        (acc, product) => acc + product.quantity,
        0
      );
      // It will iterate over every products quantity and then in the end it will persist single value
      createCartForUser.totalPrice = createCartForUser.items.reduce(
        (acuumulator, product) =>
          acuumulator + product.price * product.quantity,
        0
      );

      await createCartForUser.save(); // save the cart before returning

      return createCartForUser; //Created Cart will be send from here itself.
    }

    //If Cart Already Created then only update the quantity

    // .find() method will not copy an element from array it gives the reference.
    let findIfProductAlreadyExists = findCartById.items.find(
      (product) =>
        product.product._id.toString() === cartData.productId.toString()
    );
    if (findIfProductAlreadyExists) {
      // Here product will already exist in Cart now update the quantity
      findIfProductAlreadyExists.quantity += cartData.productQuantity;
      // ok in simple words this findIfProductAlreadyExists dont consist copy instead this is reference to the object inside the items , because we are using find() to get the object , so TLDR it is reference not copy
    }

    // Now if that product not exist already then we have to create new Object , we get that productId from User , and earlier we simply take that product id and find the product from DB , now we have to add that product into Cart
    else {
      const newProduct = {
        product: findProduct._id, //here i can simply put cartData.productId instead this , but what we did here is we fetch the product from the DB for finding if that product is valid or not , so here simply we reuse the properties of finded product from DB
        quantity: cartData.productQuantity,
        price: findProduct.price,
      };

      findCartById.items.push(newProduct); //Now this object will be pushed at the last

      // await findCartById.save();   //In the end we are saving so no need to save here
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

  updateCartService: async (userId, cartData, productId) => {
    // find if this user have cart by this Id
    let checkIfUserHaveCart = await Cart.findOne({ user: userId });

    if (!checkIfUserHaveCart)
      throw new ApiError(
        400,
        "User dont have Cart to Update , first Create One"
      );
    // No need for this because this route will only get called when we have a product inside a Cart

    // But if Cart is there then update its field

    let findThatProductFromCart = checkIfUserHaveCart.items.find(
      (product) => product._id.toString() === productId.toString()
    );
    // Why toString() , because inside that entry it is stored as ObjectId , but we get string by user that's why
    // here logic is changed , we will be getting the productId from params

    if (!findThatProductFromCart)
      throw new ApiError(404, "Product not found for Update");

    // If that product Exist then first check if cartData's value is positive or negative
    if (cartData.productQuantity > 0)
      // No need of this also but for safety we are doing this
      findThatProductFromCart.quantity += cartData.productQuantity;
    // 0 will never be the case cause from frontend itself we will send values greater than or equal 1

    // In frontend we will make the cart quantity change logic just like Amazon's Cart

    // Now here update the TotalItems and TotalPrice

    checkIfUserHaveCart.totalItems = checkIfUserHaveCart.items.reduce(
      (acc, product) => acc + product.quantity,
      0
    );
    checkIfUserHaveCart.totalPrice = checkIfUserHaveCart.items.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );

    // Now simply save the Cart

    await checkIfUserHaveCart.save();

    return checkIfUserHaveCart;
  },

  deleteProductService: async (productId, userId) => {
    let checkUserHaveCart = await Cart.findOne({ user: userId });

    if (!checkUserHaveCart)
      throw new ApiError(400, "Cart does not exist to perform this operation");

    const checkIfProductExistInCart = checkUserHaveCart.items.find(
      (product) => product._id.toString() === productId.toString()
    );
    // Now if this true then simply delete the product from cart

    if (!checkIfProductExistInCart)
      throw new ApiError(404, "Product not Found to perform delete Operation");

    const newItemsArray = checkUserHaveCart.items.filter(
      (product) => product._id.toString() !== productId.toString()
    );
    // here that product will be removed

    // Now update the items array
    checkUserHaveCart.items = newItemsArray;

    checkUserHaveCart.totalItems = checkUserHaveCart.items.reduce(
      (acc, product) => acc + product.quantity,
      0
    );
    checkUserHaveCart.totalPrice = checkUserHaveCart.items.reduce(
      (acc, product) => acc + product.quantity * product.price,
      0
    );

    // Now save and return the updated Cart.
    await checkUserHaveCart.save();

    return checkUserHaveCart;
  },

  getCartService: async (userId) => {
    const checkIfUserHaveCart = await Cart.findOne({ user: userId })
      .populate("items.product _id name price description image")
      .lean();
    // By populate now the project : ObjectId will replace with that product objects field , now user can see the Cart perfectly.
    // By .lean() method our mongoose document will be converted into plain JS object , but why ? because without this by default mongoose doc will have .save() , .validate() etc., methods and we dont need it because we are simply providing Cart by GET method thats why

    if (!checkIfUserHaveCart)
      throw new ApiError(404, "User Dont have any Cart");

    return checkIfUserHaveCart;
  },
};

export default CartService;
