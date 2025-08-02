import { User } from "../modules/user/user.model";
import ApiError from "../utils/ApiError.utility";

const seeIfHeIsAdmin = async (req, res, next) => {
  // We will get payload from auth middleware req.user inside this
  const payloadInfoFromAuth = req.user;
  const findEntryInDB = await User.findById(payloadInfoFromAuth._id);

  if (findEntryInDB.role !== "admin")
    throw new ApiError(404, "Unauthorized Access");

  next();
};


export default seeIfHeIsAdmin;
