import Joi from "joi";
import ApiError from "../../utils/ApiError.utility.js";

export const productValidation = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  description: Joi.string().min(5).required(),
  price: Joi.number().positive().required(),
  discountPrice: Joi.number().min(0).optional(),
  category: Joi.string().required(),
  brand: Joi.string().required(),
  stock: Joi.number().min(0).optional(),
  ratings: Joi.number().min(0).max(5).optional(),
  numOfReviews: Joi.number().min(0).optional(),
  reviews: Joi.array()
    .items(
      Joi.object({
        user: Joi.string().hex().length(24).optional(),
        name: Joi.string().optional(),
        rating: Joi.number().min(0).max(5).optional(),
        comment: Joi.string().optional(),
      })
    )
    .optional(),
  createdBy: Joi.string().hex().length(24).required(),
  isAvailable: Joi.boolean().optional(),
});

export const validateProductSchema = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errMsg = error.details.map((err) => err.message).join(",");

    return next(new ApiError(400, errMsg));
  }

  req.validatedProductSchema = value;

  next();
};

// Validation & middleware for updation in product



export const productUpdateValidation = Joi.object({
  name: Joi.string().trim().min(2).max(100).optional(),
  description: Joi.string().min(5).optional(),
  price: Joi.number().positive().optional(),
  discountPrice: Joi.number().min(0).optional(),
  category: Joi.string().optional(),
  brand: Joi.string().optional(),
  stock: Joi.number().min(0).optional(),
  isAvailable: Joi.boolean().optional(),
});

export const productUpdationMiddleware = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true, // removes extra key/value pairs from the req means unncessary key/value
  });

  if (error) {
    const errMsg = error.details.map((err) => err.message).join(",");

    return next(new ApiError(400, errMsg));
  }
  req.validatedProductUpdateSchema = value;

  next();
};
