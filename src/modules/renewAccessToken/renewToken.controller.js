import ApiError from "../../utils/ApiError.utility";
import jwt from "jsonwebtoken";
import { User } from "../user/user.model";
import auth_loginService from "../auth/auth.service";
import ApiResponse from "../../utils/ApiResponse.utility";

const renewAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) throw new ApiError(400, "Provide Refresh Token");

  // if we get then now verify()

  const validateTheRefreshToken = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET_KEY
  );

  if (!validateTheRefreshToken)
    throw new ApiError(400, "Either Refresh Token Expired or it is Invalid");

  // Till this point the work of refreshToken will be done , now simply use the functionality

  const getPayloadId = validateTheRefreshToken._id;

  const findUserByPayloadId = await User.findById(getPayloadId);

  if (!findUserByPayloadId)
    throw new ApiError(404, "User not Found By Payload Id");

  // Now find if the refreshTokens are same or not , by comparing both of them

  if (refreshToken.toString() !== findUserByPayloadId.refreshToken.toString())
    throw new ApiError(400, "Unauthorized Access");
  // By this we are checking if same user want new token , either it will be security fault and anyone can manipulate anyone's things.

  // Now from here User is valid to create new access Token

  const accessToken = auth_loginService.createAccessToken(findUserByPayloadId); //Now directly send the Finded Object , why this obj , because from verify we get payload , now if they both are same the refreshToken and the saved entrys refreshToken that means same user want to create new token , and first we check refreshToken cause we need refreshToken to create the AccessToken.

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Access Token Created SuccessFully", accessToken)
    );
};

export default renewAccessToken;
