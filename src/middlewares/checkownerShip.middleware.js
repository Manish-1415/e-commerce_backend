import ApiError from "../utils/ApiError.utility.js";

const checkOwnerShip = (model) => async (req, res, next) => {
  const userId = req.user._id; // User Id from Token
  const resourceUserTryToAccess = req.params.id; // resource User want to update

  // So what we have to do here is check if the user who is trying to do operations with Order/Cart is the user who's id is in that model

  const nowFindTheResource = await model.findOne({
    _id: resourceUserTryToAccess,
  }); //finding resource first

  if (!nowFindTheResource)
    throw new ApiError(400, "User Cannot Perform this Operation"); // if resource not found then it cannot be performed

  if (nowFindTheResource.user._id.toString() === userId.toString()) {
    // if found then check condition that the user who is logged in and the user who is owner are same or not if yes then let him do the task,
    return next();
  } else {
    //if they both are not same then throw error
    next(new ApiError(400, "Unauthorized Access"));
  }
};

export default checkOwnerShip;
