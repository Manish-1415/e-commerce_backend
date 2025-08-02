import ApiError from "../../utils/ApiError.utility";
import uploadOnCloudinary from "../../utils/cloudinary.utility";
import { Product } from "./product.model";
import deleteFileFromCloudinary from "../../utils/deleteFromCloudinary.utility";

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

    if (!getProduct)
      throw new ApiError(400, "Provided Product Id is not valid");

    return getProduct;
  },

  updateProduct: async (productId, productData, newFile) => {
    if (newFile) {
      // If we got new file then simply delete previous img url
      let findTheEntryById = await Product.findById(productId);
      if (!findTheEntryById) throw new ApiError(404, "Product not Found");

      await deleteFileFromCloudinary(findTheEntryById.image); //Deleting File From Cloudinary , sending old image url

      findTheEntryById.image = "";
      // Now old URL will be gone , create new URL
      const generatingNewImgUrl = await uploadOnCloudinary(newFile);

      if (!generatingNewImgUrl)
        throw new ApiError(
          500,
          "Error occur while uploading file on Cloudinary"
        );

      productData.image = generatingNewImgUrl; // here i have simply made a change , i have been using wrong i am updating that finded product instead of what we get .

      // Now save the product

      Object.assign(findTheEntryById, productData); // Here i have simply changes the fields that we are getting from req.body , so now in simple words we assign new values from user to existing product entry.

      const updatedProduct = await findTheEntryById.save();

      return updatedProduct;
    } else {
      let findTheEntryById = await Product.findById(productId);

      if (!findTheEntryById) throw new ApiError(404, "Product not Found");

      Object.assign(findTheEntryById, productData);

      const updatedProduct = await findTheEntryById.save();

      return updatedProduct;
    }
  },
};

export default ProductService;
