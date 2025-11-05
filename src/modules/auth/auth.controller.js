import asyncHandler from "../../utils/asyncHandler.utility.js";
import authService from "./auth.service.js";
import ApiResponse from "../../utils/ApiResponse.utility.js";

export const loginUser = asyncHandler(async (req, res) => {
  const logTheUser = await authService.loggedInUser(req.validatedLoginSchema);

  const { accessToken, refreshToken, updateRefreshToken } = logTheUser;

  const resSendToUser = {
    _id: updateRefreshToken._id,
    fullname: updateRefreshToken.fullname,
    email: updateRefreshToken.email,
    role: updateRefreshToken.role,
  };

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .json(
      new ApiResponse(200, "User LoggedIn Successfully !", {
        userObj: resSendToUser,
        accessToken,
      })
    );
});

export const logOutUser = asyncHandler(async (req, res) => {
  const accessToken = req.headers.authorization;
  const logOut = await authService.logOutTheUser(accessToken);

  const resToSend = {
    _id: logOut._id,
    email: logOut.email,
    fullname: logOut.fullname,
  };

  return res
    .status(200)
    .clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 0,
    })
    .json(new ApiResponse(200, "User Logged-out successfully !", resToSend));
});

export const createNewAccessToken = asyncHandler(async (req, res) => {
  // for access token generation check if the refreshToken is valid or not first

  const refreshToken = req.cookies.refreshToken;

  const createToken = await authService.generateToken(refreshToken);

  return res
    .status(201)
    .json(new ApiResponse(201, "Access Token re-generated", {accessToken : createToken}));
});
