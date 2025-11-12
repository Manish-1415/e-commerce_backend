import asyncHandler from "../../utils/asyncHandler.utility.js";
import productService from "./product.service.js";
import ApiResponse from "../../utils/ApiResponse.utility.js";

export const createProduct = asyncHandler(async (req, res) => {
  // here simply assume u got the validated product data

  let productCreation = await productService.createProductEntry(
    req.validatedProductSchema , req.file
  );

  return res
    .status(201)
    .json(
      new ApiResponse(201, "Product Created Successfully !", productCreation)
    );
});

export const updateProduct = asyncHandler(async (req, res) => {
  const updateEntry = await productService.updateProductEntry(
    req.validatedProductUpdateSchema,
    req.params.id,
    req.file
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Product Updated Successfully !", updateEntry));
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const deleteTheProduct = await productService.deleteProductEntry(
    req.params.id
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Product Deleted Successfully !", deleteTheProduct)
    );
});

export const getProductById = asyncHandler(async (req, res) => {
  const getProduct = await productService.getProductEntryById(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Product Fetched Successfully !", getProduct));
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const findAllProducts = await productService.getAllProductEntry();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Sending data as per all products request",
        findAllProducts
      )
    );
});
