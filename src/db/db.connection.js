import mongoose from "mongoose";
import { dbName } from "../constants/constants.js";
import ApiError from "../utils/ApiError.utility.js";

const connectDB = async () => {
  try {
    const connectionToDB = await mongoose.connect(
      `${process.env.MONGODB_URI}/${dbName}`
    );

    if (!connectionToDB)
      throw new ApiError(500, "Error Occurred while connecting DB");

    console.log("DB Connected Successfully !");
    console.log("Host of DB ",connectionToDB.connection.host);

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
