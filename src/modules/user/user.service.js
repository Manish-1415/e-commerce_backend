import { User } from "./user.model.js";
import bcrypt from "bcrypt";
import ApiError from "../../utils/ApiError.utility.js";

const RegisterUserService = {
    
    registerUserInDB : async (userData) => {
        try {
            let { fullname , email , password , role } = userData;  // I changed var declaration to let because const will not let us change the default value

            const hashThePassword = await bcrypt.hash(password , 10);

            if(!hashThePassword) throw new ApiError(500 , "Error Occurred While Hashing the password");

            password = hashThePassword; // If hashing done , then store that hashed pass in password itself

            const createUserEntryInDB = User.create(
                {
                    fullname,
                    email,
                    password,
                    role,
                }
            );

            if(!createUserEntryInDB) throw new ApiError(500 , "Error Occurred While registering User in DB");

            return createUserEntryInDB;

        } catch (error) {
            
        }
    }
}

export default RegisterUserService;