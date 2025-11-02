import Joi from "joi";

export const userValidation = Joi.object({
  fullname: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  avatar: Joi.string().uri().optional(),
  refreshToken: Joi.string().optional(),
});

import ApiError from "../../utils/ApiError.utility.js";

export const userValidationMiddleware = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body , {abortEarly : false}); //abortEarly false make sure all ur errors shown instead of stopping at first 

  if (error) {
    const errorMsg = error.details.map((err) => err.message).join(",");

    return next(new ApiError(400, errorMsg));
  }

  req.validatedUserDetails = value;

  next();
};
