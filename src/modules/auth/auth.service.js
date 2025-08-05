import User from "../user/user.model.js";
import ApiError from "../../utils/ApiError.utility.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const auth_loginService = {
  checkUserInDB: async (dataObj) => {
    const checkInDBByEmail = await User.findOne({ email: dataObj.email });

    if (!checkInDBByEmail)
      throw new ApiError(
        404,
        "User is not in DB , Please Register the User first"
      );

    const verifyThePassword = await bcrypt.compare(
      dataObj.password,
      checkInDBByEmail.password
    );  //compare returns true or false only

    if (!verifyThePassword)
      throw new ApiError(401, "Please Provide Valid Password to Login");

    return checkInDBByEmail;
  },

  createAccessToken: (dataObj) => {
    try {
      const createAccessToken = jwt.sign(
        {
          _id: dataObj._id,
          name: dataObj.fullname,
          email: dataObj.email,
          role: dataObj.role,
        },

        process.env.ACCESS_TOKEN_SECRET_KEY,

        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
      );
      return createAccessToken;
    } catch (error) {
      console.log("JWT Error :", error);

      throw new ApiError(500, "Error Occur while creating Access Token");
    }
  },

  createRefreshToken: (dataObj) => {
    try {
      const refreshToken = jwt.sign(
        {
          _id: dataObj._id,
        },

        process.env.REFRESH_TOKEN_SECRET_KEY,

        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
      );

      return refreshToken;
    } catch (error) {
      console.log("JWT Error :", error);

      throw new ApiError(500, "Error Occur While creating Refresh Token");
    }
  },

  saveRefreshTokenInDB: async (dataObj, refreshToken) => {
    let checkUserInDB = await User.findById(dataObj._id);

    if (!checkUserInDB) throw new ApiError(404, "Register the User First");

    checkUserInDB.refreshToken = refreshToken; //In mongoose it will saved , then to update it in DB , u have to make it save

    const saveTheUpdatedInfo = await checkUserInDB.save();

    if (!saveTheUpdatedInfo)
      throw new ApiError(
        500,
        "Error Occur While Saving the Updated Info Of a User"
      );

    return saveTheUpdatedInfo;
  },
};

export default auth_loginService;
