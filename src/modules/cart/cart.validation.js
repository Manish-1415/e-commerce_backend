import j from "joi";
import ApiError from "../../utils/ApiError.utility.js";

export const cartSchemaValidation = j.object({
  productId: j.string().required(),
  productQuantity: j.number().required(),
});

// Middleware for checking if req body have the product Id and Quantity

export const updateCartSchemaValidation = j.object({
  productQuantity: j.number().required(),
});


export const validateReqBodyForCart = (schema = (req, res, next) => {
  try {
    const { error, value } = schema.validate(req.body , {abortEarly : false});

    if (error) {
      const errMsg = error.details.map((err) => err.message).join(" , ");

      next(new ApiError(400, errMsg));
    }

    req.validatedCartReqData = value;

    next();
  } catch (error) {
    console.log("Error Occured in Cart Creation Request", error);
  }
});
