import ApiError from "../../utils/ApiError.utility.js";
import uploadFileOnCloudinary from "../../utils/cloudinary.utility.js";
import deleteFileFromClodinary from "../../utils/deleteCloudinaryFile.utility.js";
import { User } from "./user.model.js";

const userService = {
  registerUserEntry: async function (userDetailsObj, file) {
    // check if user already exist
    const checkUserInDB = await User.findOne({ email: userDetailsObj.email });

    if (checkUserInDB)
      throw new ApiError(400, "User already exist with same email");

    if (file && file.path) {
      // check users role
      if (userDetailsObj.role === "admin") {
        if (userDetailsObj.adminKey === process.env.ADMIN_KEY) {
          delete userDetailsObj.adminKey;

          const cloudinaryUrl = await uploadFileOnCloudinary(file.path);

          userDetailsObj.avatar = {
            public_id: cloudinaryUrl.public_id,
            url: cloudinaryUrl.url,
          };

          const createAdmin = await User.create(userDetailsObj);

          if (!createAdmin)
            throw new ApiError(500, "Err Occurred while creating Admin");

          return createAdmin;
        } else {
          throw new ApiError(404, "Admin Key Mismatched");
        }
      } else {
        const cloudinaryUrl = await uploadFileOnCloudinary(file.path);

        userDetailsObj.avatar = {
          public_id: cloudinaryUrl.public_id,
          url: cloudinaryUrl.url,
        };

        const user = await User.create(userDetailsObj);

        return user;
      }
    } else {
      if (userDetailsObj.role === "admin") {
        if (userDetailsObj.adminKey === process.env.ADMIN_KEY) {
          delete userDetailsObj.adminKey;

          const createAdmin = await User.create(userDetailsObj);

          if (!createAdmin)
            throw new ApiError(500, "Err Occurred while creating Admin");

          return createAdmin;
        } else {
          throw new ApiError(404, "Admin Key Mismatched");
        }
      } else {
        const user = await User.create(userDetailsObj);

        return user;
      }
    }
  },

  updateUserEntry: async (updateObjInfo, userInfoObj, file) => {
    // find if user is in DB
    let findTheUser = await User.findById(userInfoObj.id);

    if (!findTheUser)
      throw new ApiError(
        404,
        "User cannot perform this operation , register first"
      );

    if (file || file.path) {
      if (findTheUser.avatar.url === "") {
        const cloudinaryUrl = await uploadFileOnCloudinary(file.path);

        updateObjInfo.avatar = cloudinaryUrl;
      } else {
        await deleteFileFromClodinary(findTheUser.avatar.public_id);

        findTheUser.avatar = "";

        await findTheUser.save();

        const cloudinaryUrl = await uploadFileOnCloudinary(file.path);

        updateObjInfo.avatar = cloudinaryUrl;
      }
    }
    const findAndUpdateUser = await User.findByIdAndUpdate(
      userInfoObj.id,
      updateObjInfo,
      { new: true }
    );

    if (!findAndUpdateUser)
      throw new ApiError(500, "Err Occurred while Updating user");

    return findAndUpdateUser;
  },
};

export default userService;
