import asyncHandler from "../../utils/asyncHandler.utility.js";
import userService from "./user.service.js";
import ApiResponse from "../../utils/ApiResponse.utility.js";

const registerUser = asyncHandler(async (req, res) => {
  let registerUserInDB = await userService.registerUserEntry(
    req.validatedUserDetails
  );

  const { fullname, email, _id , role } = registerUserInDB;

  const resObjOfUser = {
    fullname,
    email,
    _id,
    role
  };

  return res
    .status(201)
    .json(new ApiResponse(201, "User Registered Successfully !", resObjOfUser));
});

export {registerUser};
