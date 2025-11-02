import ApiError from "../../utils/ApiError.utility.js";
import { User } from "../user/user.model.js";
import { generateAccessToken } from "../../utils/tokens.utility.js";
import { generateRefreshToken } from "../../utils/tokens.utility.js";
import { validateToken } from "../../utils/tokens.utility.js";

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
        _id: findUserByEmail._id,
        fullname: findUserByEmail.fullname,
        email: findUserByEmail.email,
      },
      process.env.ACCESS_SECRET_KEY,

      process.env.ACCESS_TOKEN_EXPIRY
    );

    const refreshToken = generateRefreshToken(
      {
        _id: findUserByEmail._id,
      },
      process.env.REFRESH_SECRET_KEY,

      process.env.REFRESH_TOKEN_EXPIRY
    );

    // now when u got the access & refresh token , now save refreshToken in DB

    findUserByEmail.refreshToken = refreshToken;

    const updateRefreshToken = await findUserByEmail.save()

    if(!updateRefreshToken) throw new ApiError(500 , "Error occurred while saving refreshToken in DB");

    return {
       accessToken : accessToken ,
        refreshToken : refreshToken , 
        updateRefreshToken : updateRefreshToken
    }
  },


  logOutTheUser : async function(accessToken , refreshToken) {
    // first validate the accessToken 
    const token = accessToken.split(" ")[1]; // It will split Bearer & token separate & split returns an array so [1] means token

    const validateAccessToken = validateToken(token);

    if(!validateAccessToken) throw new ApiError(400 , "Invalid Access Token");

    // now check if user who wants to logOut is exist in db or not 

    let checkIfUserExist = await User.findById(validateAccessToken._id);
    
    if(!checkIfUserExist) throw new ApiError(404 , "User does not exist");


    // const validateRefreshToken = validateToken(refreshToken);  no need for this because here we will log out the user only when we have valid session , no need for checking refreshToken.

    checkIfUserExist.refreshToken = "";

    const saveChangesForUser = await checkIfUserExist.save();

    if(!saveChangesForUser) throw new ApiError(500 , "Error Occurred while saving changes");

    return saveChangesForUser;
  },

};

export default authService;
