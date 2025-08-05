import { Router } from "express";
import registerUser from "./user.controller.js";
import { validateTheReqBody } from "./user.validation.js";
import { registerUserSchemaToValidate } from "./user.validation.js";

const router = Router();

router.route("/register").post(validateTheReqBody(registerUserSchemaToValidate) , registerUser);
// Now by validateTheReqBody , the clients data will be validate first then , the validate data will go to registerUser controller


export default router;