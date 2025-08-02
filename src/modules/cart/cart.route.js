import { Router } from "express";
import { createCart } from "./cart.controller";
import { validateReqBodyForCart } from "./cart.validation";
import { cartSchemaValidation } from "./cart.validation";

const router = Router();


router.route("/").post( validateReqBodyForCart(cartSchemaValidation) , createCart);



export default router;