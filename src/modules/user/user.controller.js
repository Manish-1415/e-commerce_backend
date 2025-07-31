import RegisterUserService from "./user.service.js";
import ApiResponse from "../../utils/ApiResponse.utility.js";

const registerUser = async (req , res) => {
    // By JOI we validate the data , now here we can simply use that by req.validatedReqBody
    const userData = req.validatedReqBody;

    const registerUser = await RegisterUserService.registerUserInDB(userData);

    const theResDataToSendUser = {
        _id: registerUser._id,
        fullname : registerUser.fullname,
        email : registerUser.email,
        role : registerUser.role,
    };

    
    return res
    .status(201)
    .json(new ApiResponse(201 , "User Created Successfully !" , theResDataToSendUser));
    
}

export default registerUser;