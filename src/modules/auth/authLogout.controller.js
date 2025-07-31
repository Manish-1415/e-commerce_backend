import ApiError from "../../utils/ApiError.utility.js";
import ApiResponse from "../../utils/ApiResponse.utility.js";
import AuthLogOutService from "./authLogout.service.js";

const logOutUser = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  // const accessToken = req.headers.accessToken;     In logout no need of access token
  
  if(!refreshToken) throw new ApiError(400 , "No Refresh Token Found in Cookie");

  const validateTheUserForLogout = await AuthLogOutService.validateUserToLogout(
    refreshToken
  );

  const resDataToSendUser = {
    _id: validateTheUserForLogout._id,
    fullname: validateTheUserForLogout.fullname,
    email: validateTheUserForLogout.email,
    role: validateTheUserForLogout.role,
  };

  return res
    .status(200)
    .clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 0,    // set maxAge 0 to delete cookie or dont give age
    })
    .json(
      new ApiResponse(200, "User Logged-out Successfully !", resDataToSendUser)
    );
};

export default logOutUser;
