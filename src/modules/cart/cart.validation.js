import Joi from "joi";
import ApiError from "../../utils/ApiError.utility";

export const addToCartSchema = Joi.object({
  productId: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/), // regex is also like type-safety like which like condition

  quantity: Joi.number()
    .integer()
    .min(1)
    .required()
});


export const cartSchemaMiddleware = (schema) => (req , res , next) => {
    const {error , value} = schema.validate(req.body , {abortEarly : false , stripUnknown : true});

    if(error) {
        const errMsg = error.details.map( (err) => err.message ).join(",");

        return next(new ApiError(400 , errMsg));
    }

    req.validatedCartSchema = value;

    next();
}