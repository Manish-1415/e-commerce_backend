import mongoose from "mongoose";
import ApiError from "../utils/ApiError.utility.js";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGODB_URI}/ecommerce-db`
    );

    if (!connection)
      throw new ApiError(500, "Error Occurred while connecting with DB");

    console.log("DB connected successfully ⚙️");
  } catch (error) {
    console.log("DB connect Err", error);
    process.exit(1);
  }
};

export default connectDB;
