import { v2 as cloudinary } from "cloudinary";
import ApiError from "./ApiError.utility";

const deleteFileFromCloudinary = async (imageUrl) => {
  try {
    // we are getting URL like :- https://res.cloudinary.com/demo/image/upload/v1698765432/folder/img_abc123.jpg

    // and for deleting we only need this part of URL which is , folder/img_abc123

    const imgSplitting = imageUrl.split("/"); //This is string method user to separate string from separator to array elements

    const partForDeleting = imgSplitting.slice(-2).join("/"); // By this method slice will create separate array with the valued elements , -2 means from backwards we are slicing the elements , and by join ("/") we will make those elements into string

    const pathToSendForDeleting = partForDeleting.split(".")[0]; // by this we separting .fileformat(png, jpg or any format) because we dont need format to delete , and now we will get only this , folder/img_abc123 and this is what we really needed

    const deleteFile = await cloudinary.uploader.destroy(pathToSendForDeleting);

    return deleteFile;
  } catch (error) {
    console.log("Error Occur while Deleting File On Cloudinary :- ", error);
    throw new ApiError(500 , "Error Occurred while Deleting File From Cloudinary");
  }
};

export default deleteFileFromCloudinary;
