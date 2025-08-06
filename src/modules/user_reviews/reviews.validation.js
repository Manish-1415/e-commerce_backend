import Joi from "joi";
import ApiError from "../../utils/ApiError.utility.js";

export const reviewSchemaForCreation = Joi.object({
  comment: Joi.string().required().messages({
    "any.required": "Comment is required",
    "string.empty": "Comment cannot be empty",
  }),
  rating: Joi.number().min(1).max(5).required().messages({
    "any.required": "Rating is required",
    "number.base": "Rating must be a number",
    "number.min": "Rating must be at least 1",
    "number.max": "Rating cannot be more than 5",
  }),
});


export const reviewSchemaForUpdation = Joi.object({
    rating : Joi.number().required(),
    comment : Joi.string().required(),
})


export const validateReviewSchema = (schema) = (req , res , next) => {
    const {error , value} = schema.validate(req.body);
    
    if(error) {
        const errMsg = error.details.map( (err) => err.message ).join(" , ");

        next(new ApiError(400 , errMsg));
    }

    req.validatedReviewBody = value;
    
    next();
}