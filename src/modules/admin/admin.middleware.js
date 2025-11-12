import ApiError from "../../utils/ApiError.utility.js";

const checkIfUserIsAdmin = (req , res , next) => {
    if(req.user.role !== "admin") throw new ApiError(400, "User is not authrized to perform this opertation");

    next();
}

export default checkIfUserIsAdmin;