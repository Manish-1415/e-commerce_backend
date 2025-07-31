import {j} from "joi";


export const loginUserSchema = j.object({
    email : j.string().email().required(),
    password : j.string().min(6).required(),
});






// Middleware for checking the Req Body

import ApiError from "../../utils/ApiError.utility.js";


export const validatedReqBodyForLogin = (schema) => (req , res , next) => {
    const {error , value} = schema.validate(req.body);

    if(error) {
        const errMsg = error.details.map( (err) => err.message ).join(" , ");

        return next(new ApiError(400, errMsg));
    }

    req.validatedReqBodyForLogin = value; // Clean Object as schema with completely checked validation

    next();
}