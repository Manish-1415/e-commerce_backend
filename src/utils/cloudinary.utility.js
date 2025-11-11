import { v2 as cloudinary} from "cloudinary";
import fs from "fs";
import ApiError from "./ApiError.utility.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadFileOnCloudinary = async (localFilePath) => {
  try {
    if(!localFilePath) throw new ApiError(500 , "Could not find local file path to upload");

    const uploadFile = await cloudinary.uploader.upload(localFilePath , {
      resource_type : "auto" // it means i dont know what is file type , figure our urself & assign the resource type
    })

    if(!uploadFile) throw new ApiError(500 , "Error Occurred while uploading file")

      console.log("File Uploaded successfully", uploadFile.url);

      return { public_id : uploadFile.public_id , url : uploadFile.secure_url }

  } catch (error) {
    console.log(error)
    throw new ApiError(500 , "Error Occurred While Uploading File")
  }
  finally {
      fs.unlinkSync(localFilePath);
  }
}

export default uploadFileOnCloudinary;