import ApiError from "../../utils/ApiError.utility.js";
import { User } from "./user.model.js";

const userService = {
    registerUserEntry : async function (userDetailsObj) {
        // first check if user already exist

        const checkUserInDB = await User.findOne({email : userDetailsObj.email});

        if(checkUserInDB) throw new ApiError(400 , "User already exist with same email");

        //if not present in DB now make user entry in db

        const createUser = await User.create(userDetailsObj);

        if(!createUser) throw new ApiError(500 , "Error Occurred while creating user");

        return createUser;
    }
}


export default userService;