import Joi from "joi";

export const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});



import ApiError from "../../utils/ApiError.utility.js"

export const loginValidationMiddleware = (schema) => (req , res , next) => {
    const { error , value } = schema.validate(req.body , { abortEarly : false });

    if(error) {
        const errMsg = error.details.map( (err) => err.message ).join(",");

        return next(new ApiError(400 , errMsg));
    }

    req.validatedLoginSchema = value;

    next();
}