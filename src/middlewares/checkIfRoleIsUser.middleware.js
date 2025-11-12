import ApiError from "../utils/ApiError.utility.js";

const checkUserRole = (req , res , next) => {
    // check if users role is user
    if(req.user.role !== "user") throw new ApiError(400 , "Admin / Seller cannot perform cart operations");
    // if user role is not user then throw err & move ahead
    next();
}

export default checkUserRole;