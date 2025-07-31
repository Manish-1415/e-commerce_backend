import auth_loginService from "./auth.service.js";
import ApiResponse from "../../utils/ApiResponse.utility.js";

const loginTheUser = async (req , res) => {
    const userData = req.validatedReqBodyForLogin;

    const checkIfUserPresentInDB = await auth_loginService.checkUserInDB(userData);

    const accessToken = auth_loginService.createAccessToken(checkIfUserPresentInDB);

    const refreshToken = auth_loginService.createRefreshToken(checkIfUserPresentInDB);

    const saveRefreshTokenInDB = await auth_loginService.saveRefreshTokenInDB(checkIfUserPresentInDB , refreshToken);

    const dataToSendAsResponse = {
        _id : saveRefreshTokenInDB._id,
        fullname : saveRefreshTokenInDB.fullname,
        email : saveRefreshTokenInDB.email,
        role : saveRefreshTokenInDB.role,
    };


    return res
    .status(202)
    .cookie("refreshToken", refreshToken , 
        {
            httpOnly : false,
            secure : false,
            sameSite : "lax",
            maxAge : 15 * 24 * 60 * 60 * 1000 // = 1296000000 ms
        }
    )
    .json(new ApiResponse(202 , "First Login Successfull , access and refresh Token generated successfully", {accessToken , user : dataToSendAsResponse}));
}

export {loginTheUser};