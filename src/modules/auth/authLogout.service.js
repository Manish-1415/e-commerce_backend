import jwt from "jsonwebtoken";
import ApiError from "../../utils/ApiError.utility.js";
import { User } from "../user/user.model.js";

const AuthLogOutService = {
  validateUserToLogout: async (refreshToken) => {
    try {
      const validateRefreshToken = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET_KEY
      );
      // verify() returns payload , that one which we set while creating token , it checks the secret key which we have used while creating tokens

      // No need to throw error , if expiry or secret key nothing match then verify() throws error , no need to manually throw

        const payloadData = validateRefreshToken;

        const checkUserInDB = await User.findById({ _id: payloadData._id });

        if (!checkUserInDB)
          throw new ApiError(
            404,
            "User Not Found In DB , Please Provide Valid Refresh Token"
          );

        checkUserInDB.refreshToken = "";

        const logOutUser = await checkUserInDB.save();

        return logOutUser;
      
    } catch (error) {
        console.log("LogOut Error :",error);
        throw new ApiError(500 , "Error Occur While Logout")
    }
  },
};

export default AuthLogOutService;
