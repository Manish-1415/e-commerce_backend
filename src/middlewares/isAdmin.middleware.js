import { User } from "../modules/user/user.model";
import ApiError from "../utils/ApiError.utility";

const seeIfHeIsAdmin = async (req, res, next) => {
  // We will get payload from auth middleware req.user inside this
  const payloadInfoFromAuth = req.user.role;

  if (payloadInfoFromAuth !== "admin")
    next(new ApiError(404, "Unauthorized Access"));

  next();
};


export default seeIfHeIsAdmin;
