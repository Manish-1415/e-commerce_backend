import ApiError from "../utils/ApiError.utility.js";
import { User } from "../modules/user/user.model.js";
import { validateToken } from "../utils/tokens.utility.js";

const verifyUser = async (req, res, next) => {
  try {
    // check if the user have access token or not ?
    let checkForAccessToken = req.headers.authorization;

    if (!checkForAccessToken)
      throw new ApiError(400, "Please Provide Access Token");

    // if we have the token now remove bearer word

    checkForAccessToken = checkForAccessToken.split(" ")[1];

    // verify the jwt

    const validateJwt = validateToken(
      checkForAccessToken,
      process.env.ACCESS_SECRET_KEY
    );

    // now simply use that payload id & check for the user entry

    const findUserEntryInDb = await User.findById(validateJwt.id);

    if (!findUserEntryInDb)
      throw new ApiError(404, "User not found , Invalid Access Token");

    req.user = findUserEntryInDb;

    next();
  } catch (error) {
    next(error);
  }
};

export default verifyUser;
