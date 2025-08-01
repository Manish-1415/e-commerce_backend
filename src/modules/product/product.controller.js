import ApiResponse from "../../utils/ApiResponse.utility";
import ProductService from "./product.service";
import uploadOnCloudinary from "../../utils/cloudinary.utility";

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
  const getAllProducts = await ProductService.getAllProductsFromDB();

  return res
    .status(200)
    .json(new ApiResponse(200, "This are the All Products", getAllProducts));
};

export const getProductById = async (req, res, next) => {
  const productId = req.params._id; // We will get the id from parameters
  const getProduct = await ProductService.getSingleProductById(productId);

  return res
    .status(200)
    .json(new ApiResponse(200, "Product fetch successfully from DB"));
};
