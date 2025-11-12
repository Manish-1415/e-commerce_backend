import ApiError from "../utils/ApiError.utility.js";

const verifyProductManipulation = (req, res, next) => {
  const userRole = req.user.role;
  
  if (userRole === "user")
    throw new ApiError(403, "User not allow to perform this Operation");

  next();
};

export default verifyProductManipulation;
