import j from "joi";
import ApiError from "../../utils/ApiError.utility";

export const createProductSchema = j.object({
  name: j.string().required(),
  price: j.number().required(),
  mrp: j.number().optional(),
  stock: j.number().optional(),
  description: j.string().required(),
  image: j.string().required(),
  category: j.string().required(),
  brand: j.string().required(),
  ratings: j.number().optional(),
  numOfReviews: j.number().optional(),
  reviews: j
    .array()
    .items(
      j.object({
        user: j.string().hex().length(24),
        name: j.string().optional(),
        rating: j.number().optional(),
        comment: j.string().optional(),
      })
    )
    .optional(),
});

// Create a middleware to validate the req.body

export const validateReqBodyForProduct = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body);

  if (error) {
    const errMsg = error.details.map((err) => err.message).join(" , ");

    next(new ApiError(400, errMsg));
  }

  req.validatedProductData = value; // We create a property in req which is validatedProductData inside that we are storing the structured validated data that user gave us.

  next();
};
