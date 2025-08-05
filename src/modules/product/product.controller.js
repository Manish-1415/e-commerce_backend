import ApiResponse from "../../utils/ApiResponse.utility.js";
import ProductService from "./product.service.js";
import uploadOnCloudinary from "../../utils/cloudinary.utility.js";
import { Product } from "./product.model.js";

export const createProduct = async (req, res, next) => {
  // We validated the Product data by JOI , so assume u will get the data directly here , or error will throw the err
  let productData = req.validatedProductData;
  // Here the data object will come , validated

  const productImage = req.file;

  const getCloudinaryUrlForProductImage = await uploadOnCloudinary(
    productImage
  );

  productData.image = getCloudinaryUrlForProductImage;

  const createProduct = await ProductService.createProductInDB(productData);

  return res
    .status(201)
    .json(new ApiResponse(201, "Product Created Successfully", createProduct));
};

export const getAllProducts = async (req, res, next) => {
  // Pagination Added
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 15;
  const skip = (page - 1) * limit;

  // Find the Product for calculation
  const sumOfEntries = await Product.countDocuments();
  const totalPages = Math.ceil(sumOfEntries / limit);

  const getAllProducts = await ProductService.getAllProductsFromDB(limit , skip);

  return res
    .status(200)
    .json(new ApiResponse(200, "This are the All Products", { products : getAllProducts , page , totalPages }));
};

export const getProductById = async (req, res, next) => {
  const productId = req.params.id; // We will get the id from parameters
  const getProduct = await ProductService.getSingleProductById(productId);

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Product fetch successfully from DB", getProduct)
    );
};

export const updateProductById = async (req, res, next) => {
  // We are not changing some fields , we are changing whole object directly .
  const updateProduct = await ProductService.updateProduct(
    req.params.id,
    req.body,
    req.file
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Product Updated Successfully !", updateProduct)
    );
};

export const deleteProductById = async (req, res, next) => {
  const deletedProduct = await ProductService.deleteProduct(req.params.id);

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Product Deleted SuccessFully !", deletedProduct)
    );
};
