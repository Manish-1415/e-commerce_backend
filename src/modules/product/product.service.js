import ApiError from "../../utils/ApiError.utility";
import { Product } from "./product.model";

const productService = {
  createProductEntry: async (productObj) => {
    const createProduct = await Product.create(productObj);

    if (!createProduct)
      throw new ApiError(500, "Error Occurred while creating product entry");

    return createProduct;
  },

  updateProductEntry: async (updationObj, updateObjId) => {
    //simply update here , everything is checked before , like is user in DB , is allowed to do this operation , validate the schema . now simply find the product in the DB entry & update the product

    const findTheProductAndUpdate = await Product.findByIdAndUpdate(
      updateObjId,
      updationObj,
      { new: true }
    ); // this new :true means return new updated document instead of old one.

    if (!findTheProductAndUpdate) throw new ApiError(404, "Product Not found");

    return findTheProductAndUpdate;
  },

  deleteProductEntry: async (objIdToDelete) => {
    const findTheObjAndDelete = await Product.findByIdAndDelete(objIdToDelete);

    if (!findTheObjAndDelete) throw new ApiError(404, "Product Not Found");

    return findTheObjAndDelete;
  },

  getProductEntryById: async (productId) => {
    const findProductEntry = await Product.findById(productId);

    if (!findProductEntry) throw new ApiError(404, "Product Not Found");

    return findProductEntry;
  },

  getAllProductEntry: async () => {
    const findTheProductsAndReturn = await Product.find();

    if (findTheProductsAndReturn.length === 0)
      return []; // we are returning empty array 

    return findTheProductsAndReturn;
  },
};

export default productService;
