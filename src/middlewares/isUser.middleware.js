import { User } from "../modules/user/user.model";
import ApiError from "../utils/ApiError.utility";

const checkIfHeIsUser = (req, res, next) => {
  // We have to check the Role , If he is user or not , if he is user then let it be , if not then throw error
  const userIdFromPayload = req.user.role;

  // U get Id of User now , check if he's User Or Admin

  if (userIdFromPayload !== "user")
    return next(new ApiError(400, "Unauthorized Access"));

  next();
};

export default checkIfHeIsUser;
