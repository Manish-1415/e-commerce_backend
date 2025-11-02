import ApiError from "../../utils/ApiError.utility.js";
import { User } from "./user.model.js";

const userService = {
  registerUserEntry: async function (userDetailsObj) {
    // check if user already exist
    const checkUserInDB = await User.findOne({ email: userDetailsObj.email });

    if (checkUserInDB)
      throw new ApiError(400, "User already exist with same email");

    // add corner case , check if the role is admin or not

    if (userDetailsObj.role == "admin") {
      // now if the role is admin now validate the Admin Key do the thing here

      if (
        userDetailsObj.adminKey.toString() === process.env.ADMIN_KEY.toString()
      ) {

        // if the user is admin now simply delete the key value of adminKey from userDetailsObj
        delete userDetailsObj.adminKey;

        const createAdmin = await User.create(userDetailsObj);

        if (!createAdmin)
          throw new ApiError(500, "Error Occurred while creating user");

        return createAdmin;
      } else {
        throw new ApiError(400, "Please Provide Valid Admin Key");
      }
    }

    //if not present in DB now make user entry in db

    const createUser = await User.create(userDetailsObj);

    if (!createUser)
      throw new ApiError(500, "Error Occurred while creating user");

    return createUser;
  },
};

export default userService;
