import Joi from "joi";
import ApiError from "../../utils/ApiError.utility.js";

export const orderStatusSchema = Joi.object({
  orderStatus: Joi.string()
    .valid("Pending", "Shipped", "Delivered", "Cancelled")
    .required(),
});


export const orderSchemaMiddleware = (req , res , next) => {
    const { error } = orderStatusSchema.validate(req.body , {abortEarly : false , stripUnknown : true});

    if(error) return next(new ApiError(400 , "Admin Please Provide valid status"));

    next();
}