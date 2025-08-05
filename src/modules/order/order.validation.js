import Joi from "joi";
import ApiError from "../../utils/ApiError.utility.js"

export const orderValidationSchema = Joi.object({
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),

  shippingAddress: Joi.object({
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postalCode: Joi.string().required(),
    country: Joi.string().default("India"),
  }).required(),

  paymentMethod: Joi.string().valid("COD").required(),
});





const reqBodyValidationForOrder = (schema) => (req , res , next) => {
    const {error , value} = schema.validate(req.body);

    if(error) {
        const errMsg = error.details.map( (err) => err.message ).join(" , ");

        next(new ApiError(400, errMsg));
    }

    req.validatedOrderData = value;

    next();
}