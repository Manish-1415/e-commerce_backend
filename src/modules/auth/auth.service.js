import ApiError from "../../utils/ApiError.utility.js";
import { User } from "../user/user.model.js";
import { generateAccessToken } from "../../utils/tokens.utility.js";
import { generateRefreshToken } from "../../utils/tokens.utility.js";
import { validateToken } from "../../utils/tokens.utility.js";
import jwt from "jsonwebtoken";

const authService = {
  loggedInUser: async (validatedObjForLogin) => {
    // check if user exist or not
    let findUserByEmail = await User.findOne({
      email: validatedObjForLogin.email,
    });

    if (!findUserByEmail)
      throw new ApiError(404, "Please Register the User first");

    // if user exist then now create tokens

    const accessToken = generateAccessToken(
      {
        id: findUserByEmail._id,
        fullname: findUserByEmail.fullname,
        email: findUserByEmail.email,
        role: findUserByEmail.role,
      },
      process.env.ACCESS_SECRET_KEY,

      process.env.ACCESS_TOKEN_EXPIRY
    );

    const refreshToken = generateRefreshToken(
      {
        id: findUserByEmail._id,
      },
      process.env.REFRESH_SECRET_KEY,

      process.env.REFRESH_TOKEN_EXPIRY
    );

    // now when u got the access & refresh token , now save refreshToken in DB

    findUserByEmail.refreshToken = refreshToken;

    const updateRefreshToken = await findUserByEmail.save();

    if (!updateRefreshToken)
      throw new ApiError(500, "Error occurred while saving refreshToken in DB");

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      updateRefreshToken: updateRefreshToken,
    };
  },

  logOutTheUser: async function (accessToken) {
    // we log out by session (access token)
    // first validate the accessToken
    const token = accessToken.split(" ")[1]; // It will split Bearer & token separate & split returns an array so [1] means token

    const validateAccessToken = validateToken(
      token,
      process.env.ACCESS_SECRET_KEY
    );

    if (!validateAccessToken) throw new ApiError(400, "Invalid Access Token");

    // now check if user who wants to logOut is exist in db or not

    let checkIfUserExist = await User.findById(validateAccessToken.id);

    if (!checkIfUserExist) throw new ApiError(404, "User does not exist");

    // const validateRefreshToken = validateToken(refreshToken);  no need for this because here we will log out the user only when we have valid session , no need for checking refreshToken.

    checkIfUserExist.refreshToken = "";

    const saveChangesForUser = await checkIfUserExist.save();

    if (!saveChangesForUser)
      throw new ApiError(500, "Error Occurred while saving changes");

    return saveChangesForUser;
  },

  generateToken: async function (refreshToken) {
    // check if refreshToken is valid or not

    const validateTheToken = validateToken(
      refreshToken,
      process.env.REFRESH_SECRET_KEY
    );

    if (!validateTheToken)
      throw new ApiError(400, "Refresh Token is Expired or Token is Wrong");

    // now we got the payload , what that mean is the user is present in DB , now simply create an access token for the user

    // now search the entry of user

    const findTheUser = await User.findById(validateTheToken.id);

    if (!findTheUser) throw new ApiError(400, "User not present in DB");

    // validate that the refreshToken in DB is valid or not ?

    if(findTheUser.refreshToken !== refreshToken) throw new ApiError(400 , "RefreshTokens mismatched");

    //If the user in DB have same refreshToken as we get then only create new access token.

    const accessToken = generateAccessToken(
      {
        id: findTheUser._id,
        fullname: findTheUser.fullname,
        email: findTheUser.email,
        role: findTheUser.role,
      },

      process.env.ACCESS_SECRET_KEY,

      process.env.ACCESS_TOKEN_EXPIRY
    );

    return accessToken;
  },
};

export default authService;
