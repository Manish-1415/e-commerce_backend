import ApiError from "../../utils/ApiError.utility.js";
import uploadOnCloudinary from "../../utils/cloudinary.utility.js";
import { Product } from "./product.model.js";
import deleteFileFromCloudinary from "../../utils/deleteFromCloudinary.utility.js";

const ProductService = {
  createProductInDB: async (productData) => {
    const saveProductInDB = await Product.create(productData);

    if (!saveProductInDB)
      throw new ApiError(500, "Error Occurred While Saving the Product In DB");

    return saveProductInDB;
  },

  getAllProductsFromDB: async (limit , skip) => {
    const getAllProducts = await Product.find().select("_id name price description image").skip(skip).limit(limit);

    if (!getAllProducts) throw new ApiError(500, "No Products in DB");

    return getAllProducts;
  },

  getSingleProductById: async (productId) => {
    const getProduct = await Product.findById(productId);

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

  deleteProduct: async (productId) => {
    // Before Deleting the Product , we have to delete the Image which is on cloudinary

    let findProductEntry = await Product.findById(productId);

    if (!findProductEntry)
      throw new ApiError(404, "Product Entry Not Found In DB");

    await deleteFileFromCloudinary(findProductEntry.image); //File deleted from cloudinary

    const deleteProductFromDB = await Product.findByIdAndDelete(productId);

    if (!deleteProductFromDB)
      throw new ApiError(500, "Error Occurred while deleting the Product");

    return deleteProductFromDB;
  },
};

export default ProductService;
