import Joi from "joi";
import ApiError from "../../utils/ApiError.utility";

export const updateOrderStatusSchema = Joi.object({
  status: Joi.string()
    .valid(
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
      "Failed"
    )
    .required()
    .messages({
      "any.only":
        "Status must be one of: Pending, Processing, Shipped, Delivered, Cancelled, Failed",
      "string.base": "Status must be a string",
      "any.required": "Status is required",
    }),
});

export const validateReqBodyForOrder = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body);

  if (error) {
    const errMsg = error.details.map((err) => err.message).join(" , ");

    next(new ApiError(400, errMsg));
  }

  req.validatedReqBodyForOrderStatus = value;
};
