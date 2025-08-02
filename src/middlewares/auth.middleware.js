import { User } from "../modules/user/user.model";
import ApiError from "../utils/ApiError.utility";
import jwt from "jsonwebtoken";
import auth_loginService from "../modules/auth/auth.service";
import ApiResponse from "../utils/ApiResponse.utility";

const authMiddleware = async (req, res, next) => {
  try {
    // In My previous Attempt i made a mistake , I check refresh Token first , here i only have to check for AccessToken not for refreshToken

    const accessTokenFromReq = req.headers.authorization;

    if (!accessTokenFromReq)
      throw new ApiError(400, "Please Provide Access Token");

    // If we have access Token simply verify it

    const accessToken = accessTokenFromReq.split(" ")[1];
    // Why we did this , because if user did not provide the token then throw this , if provide then remove that Bearer from it only token now

    const validateAccessToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET_KEY
    );
    // If token is expired or if it is not valid then it will throw error automatically

    if (!validateAccessToken) {
      return res
        .status(400)
        .json(new ApiError(400, "Token is either Expired or Invalid"));
    }

    if (validateAccessToken) req.user = validateAccessToken; // Here we are creating new property in req which is user , and simply providing the payload now in req , & by now protected routes can have req.user

    next(); // If everything works fine , now simply move to next middleware if u have or directly to controller.
  } catch (error) {
    console.log("Error while Auth Check", error);
    next(error);
  }
};


export default authMiddleware;