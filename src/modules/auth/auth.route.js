import { Router } from "express";
import {loginTheUser} from "./login_auth.controller.js";
import { validatedReqBodyForLogin } from "./auth.validation.js";
import { loginUserSchema } from "./auth.validation.js";
import logOutUser from "./authLogout.controller.js";

const router = Router();


router.route("/login").post(validatedReqBodyForLogin(loginUserSchema)  , loginTheUser);
// Now validatedReqBodyForLogin middleware will validate the data we get from req body

router.route("/logout").post(logOutUser);



export default router;