import ApiError from "../../utils/ApiError.utility.js";
import uploadFileOnCloudinary from "../../utils/cloudinary.utility.js";
import deleteFileFromClodinary from "../../utils/deleteCloudinaryFile.utility.js";
import { Product } from "./product.model.js";

const productService = {
  createProductEntry: async (productObj , file) => {
    // no need for checking cause admin/seller only CRUD product
    // now check the files
    if(!file || !file.path) throw new ApiError(400 , "File Not Provided or Path Mismatched");

    //upload the file on cloudinary
    const imgUrl = await uploadFileOnCloudinary(file.path); // imgUrl have the obj with public_id & url as properties

    productObj.image = imgUrl;

    const createProduct = await Product.create(productObj);

    if (!createProduct)
      throw new ApiError(500, "Error Occurred while creating product entry");

    return createProduct;
  },

  updateProductEntry: async (updationObj, updateObjId , file) => {
    // what updateProduct do ? find the product if not found throw err , if found update things 
    // check if product exist or not
    let checkForProduct = await Product.findById(updateObjId);

    if(!checkForProduct) throw new ApiError(404 , "Product Not Found");

    //if we got the product then check if we got file or not
    if(file || file.path) {
      //now what to do here ? delete first file 
      await deleteFileFromClodinary(checkForProduct.image);
      //err handled there itself in delCldniray so no need here to check
      
      //now simply create new img url here
      const newUrl = await uploadFileOnCloudinary(file.path);

      updationObj.image = newUrl;
    }
    return await Product.findByIdAndUpdate(updateObjId , updationObj , {new : true});
  },

  deleteProductEntry: async (objId) => {
    let findTheProduct = await Product.findById(objId);

    if(!findTheProduct) throw new ApiError(404 , "Product not find to delete");

    await deleteFileFromClodinary(findTheProduct.image);
    // file deleted now delete the entry

    return await Product.findByIdAndDelete(objId);
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
