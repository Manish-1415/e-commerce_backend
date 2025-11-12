import { v2 as cloudinary } from "cloudinary";
import ApiError from "./ApiError.utility.js";

const deleteFileFromClodinary = async (imgFile) => {
    try {
        // delete the file by public_id
        const deleteTheFile = await cloudinary.uploader.destroy(imgFile.public_id);

        if(deleteTheFile.result !== "ok") throw new ApiError(500 , "Error Occurred while deleting file from cloudinary");

        return deleteTheFile; // no need to return but it will not a huge problem.
    } catch (error) {
        console.log(error);
        throw new ApiError(500 , error.message || "Cloudinary failed to delete");
    }
}


export default deleteFileFromClodinary;