import { j } from "joi";

// Schema for validation of req.body
export const registerUserSchemaToValidate = j.object({
  fullname: j.string().required(),
  email: j.string().email().required(),
  password: j.string().min(6).required(),
  role: j.string().valid("user", "admin").required(),
});

// Creating middleware here itself
import ApiError from "../../utils/ApiError.utility.js";

export const validateTheReqBody = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });
  // validate returns 2 things , errors , and value
  if (error) {
    const errorMsg = error.details.map((err) => err.message).join(" , ");
    // error will throw an object , and if we have to provide the real error we have to provide, error not objects / array , so we will extract message from details and , create new array with error names in there , and after array completed we simply join the array elements into a string separated by (,) by .join() method.
    return next(new ApiError(400, errorMsg));
  }

  req.validatedReqBody = value; // IF user provide valid data then make a property in method and give the validated data

  next(); // Always do this , if not then it will stuck here itself it wont do anything.
};
