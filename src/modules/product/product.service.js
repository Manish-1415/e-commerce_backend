import ApiError from "../../utils/ApiError.utility";
import { Product } from "./product.model";

const ProductService = {
  createProductInDB: async (productData) => {
    const saveProductInDB = await Product.create(productData);

    if (!saveProductInDB)
      throw new ApiError(500, "Error Occurred While Saving the Product In DB");

    return saveProductInDB;
  },

  getAllProductsFromDB: async () => {
    const getAllProducts = await Product.find();

    if (!getAllProducts) throw new ApiError(500, "No Products in DB");

    return getAllProducts;
  },

  getSingleProductById: async (productId) => {
    const getProduct = await Product.findById({ id: productId });

    if (!getProduct) throw new ApiError(500, "Please recheck the Product ID");

    return getProduct;
  },
};

export default ProductService;
