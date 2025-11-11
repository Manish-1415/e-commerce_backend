import Joi from "joi";
import ApiError from "../../utils/ApiError.utility";

export const reviewValidation = Joi.object({
//   product: Joi.string().hex().length(24).required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().trim().optional(),
});


export const reviewValidationMiddleware = (req , res , next) => {
    const {error} = reviewValidation.validate(req.body , {abortEarly : false , stripUnknown : true});

    if(error) {
        const errMsg = error.details.map( (err) => err.message ).join(",");

        return next(new ApiError(400 , errMsg));
    }
    next();
}