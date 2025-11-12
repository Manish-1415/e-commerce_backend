import Joi from "joi";

export const orderValidationSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        product: Joi.string().required(), // ObjectId as string
        quantity: Joi.number().integer().min(1).required(),
        price: Joi.number().min(0).required(),
        discountPrice: Joi.number().min(0),
      })
    )
    .min(1)
    .required(),

  shippingAddress: Joi.object({
    fullName: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
    city: Joi.string().trim().required(),
    postalCode: Joi.string().trim().required(),
    country: Joi.string().trim().required(),
    phone: Joi.string().trim().required(),
  }).required(),

  paymentMethod: Joi.string().valid("COD", "Online").required(),

  totalAmount: Joi.number().min(0).required(),

  paymentStatus: Joi.string()
    .valid("Pending", "Paid", "Failed")
    .default("Pending"),

  orderStatus: Joi.string()
    .valid("Pending", "Processing", "Shipped", "Delivered", "Cancelled")
    .default("Pending"),
});




import ApiError from "../../utils/ApiError.utility.js";

export const orderValidationMiddleware = (req, res, next) => {
  const { error } = orderValidationSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errMsg = error.details.map((err) => err.message).join(",");

    return next(new ApiError(400, errMsg));
  }
  next();
};
