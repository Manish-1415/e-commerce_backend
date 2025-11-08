import { Product } from "../product/product.model";
import ApiError from "../../utils/ApiError.utility";
import { Cart } from "../cart/cart.model";

const cartService = {
  // before CreateCart the updateCart will be happen i mean req , & when updateCart throw error that cart is not found then we will make createCart req & then the updateCart once more .
  createCartForUser: async (productInfoObj, userObjWithPayload) => {
    // first check the Product is available or not in the DB
    const findTheProductFirst = await Product.findById(
      productInfoObj.productId
    );

    if (!findTheProductFirst) throw new ApiError(404, "Product Not Found");

    // now if product is there check for if cart is there

    const ifUserHaveCart = await Cart.findOne({ user: userObjWithPayload.id });

    if (!ifUserHaveCart) {
      // so here create a new Cart for user

      const newCart = {
        user: userObjWithPayload._id,
        items: [
          {
            product: productInfoObj.productId,
            quantity: productInfoObj.quantity,
            discountPrice: findTheProductFirst.discountPrice,
            price: findTheProductFirst.price,
          },
        ],
        totalPrice: findTheProductFirst.discountPrice * productInfoObj.quantity,
        totalItems: productInfoObj.quantity, // why use this , because here we only creating a cart not updating it .
      };

      const createNewCart = await Cart.create(newCart);

      if (!createNewCart)
        throw new ApiError(500, "Error Occurred while creating new Cart");

      return createNewCart;
    }
  },

  updateCartForUser: async (productInfoObj, userObjWithPayload) => {
    const findTheProductFirst = await Product.findById(
      productInfoObj.productId
    );

    if (!findTheProductFirst) throw new ApiError(404, "Product Not Found");

    // if product is in DB then simply check the cart is available or not in the DB

    let findTheCart = await Cart.findOne({ user: userObjWithPayload.id });

    if (!findTheCart) throw new ApiError(404, "Create The Cart First");

    // if cart is there then simply update the Cart data , what to update check if we have same product then simply update the productQuantity

    let checkIfProductIdIsSimilarInCart = findTheCart.items.find(
      (item) => item.product.toString() === productInfoObj.productId.toString()
    );
    //find will return the element

    if (!checkIfProductIdIsSimilarInCart) {
      // It means if the product is not available in the cart add that product bruhhh

      const newProductInTheCart = {
        product: productInfoObj.productId,
        quantity: productInfoObj.quantity,
        price: findTheProductFirst.price,
        discountPrice: findTheProductFirst.discountPrice,
      };

      findTheCart.items.push(newProductInTheCart);

      findTheCart.totalPrice = findTheCart.items.reduce(
        (acc, index) => acc + index.quantity * index.discountPrice,
        0
      );
      findTheCart.totalItems = findTheCart.items.reduce(
        (acc, index) => acc + index.quantity,
        0
      );

      const addedNewProductInCart = await findTheCart.save();

      if (!addedNewProductInCart)
        throw new ApiError(
          500,
          "Error Occurred while saving new product in Cart"
        );

      return addedNewProductInCart;
    }

    // if given productId & Cart Product Id is same then update the quantity only
    else {
      // Now what it means is the productId from user & in the cart DB are similar
      // simply update the quantity & total price & totalItems
      checkIfProductIdIsSimilarInCart.quantity =
        productInfoObj.quantity + checkIfProductIdIsSimilarInCart.quantity;

      findTheCart.totalPrice = findTheCart.items.reduce(
        (acc, indexOfItemsArr) => {
          return acc + indexOfItemsArr.quantity * indexOfItemsArr.discountPrice;
        },
        0
      );

      findTheCart.totalItems = findTheCart.items.reduce(
        (accumulator, indexOfItems) => {
          return accumulator + indexOfItems.quantity; // it will iterate all over the array
        },
        0
      );

      // save the updated
      const saveTheUpdatedCart = await findTheCart.save();

      if (!saveTheUpdatedCart)
        throw new ApiError(500, "Error Occurred while updating Cart");

      return saveTheUpdatedCart;
    }
  },

  deleteProduct: async (productId, userPayloadObj) => {
    // first find the product in DB then find the product in cart

    const findTheProduct = await Product.findById(productId);

    if (!findTheProduct) throw new ApiError(404, "Product Not Found in DB");

    // find the cart
    let findTheCart = await Cart.findOne({ user: userPayloadObj.id });

    if (!findTheCart)
      throw new ApiError(404, "User Dont have Cart , Create One");

    // if product is there if users id is same (logged in user & the cart owner) then simply delete the product

    let newArrayOfElements = findTheCart.items.filter(
      (item) => item.product.toString() !== productId
    );

    findTheCart.items = newArrayOfElements;
    findTheCart.totalPrice = findTheCart.items.reduce(
      (acc, index) => acc + index.discountPrice * index.quantity,
      0
    );
    findTheCart.totalItems = findTheCart.items.reduce(
      (acc, index) => acc + index.quantity,
      0
    );

    const deletedProductFromCart = await findTheCart.save();

    if (!deletedProductFromCart)
      throw new ApiError(
        500,
        "Error Occurred while deleting the product from the cart"
      );

    return deletedProductFromCart;
  },

  getCartForUser: async (userObjPayload) => {
    // check if user have Cart
    const findTheCart = await Cart.findOne({ user: userObjPayload.id });

    // if (!findTheCart) throw new ApiError(404, "Cart Not Found");

    // now simply return the cart
    if (findTheCart.items.length <= 0) return [];
    else return findTheCart;
  }, 
};

export default cartService;
