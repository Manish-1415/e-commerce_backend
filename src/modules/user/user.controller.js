import asyncHandler from "../../utils/asyncHandler.utility.js";
import userService from "./user.service.js";
import ApiResponse from "../../utils/ApiResponse.utility.js";

export const registerUser = asyncHandler(async (req, res) => {
  let registerUserInDB = await userService.registerUserEntry(
    req.validatedUserDetails,
    req.file
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


export const updateUser = asyncHandler(async (req , res) => {
  let user = await userService.updateUserEntry(req.body , req.user , req.file);

  const resToSend = {
    id : user._id,
    fullname : user.fullname,
    email : user.email,
    role : user.role,
  }

  return res
  .status(200)
  .json(new ApiResponse(200 , "User updated successfully !", resToSend));
});
