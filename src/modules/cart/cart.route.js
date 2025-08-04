import { Router } from "express";
import { createCart, deleteProduct, getCart, updateCart } from "./cart.controller";
import { updateCartSchemaValidation, validateReqBodyForCart } from "./cart.validation";
import { cartSchemaValidation } from "./cart.validation";
import authMiddleware from "../../middlewares/auth.middleware";
import checkOwnerShip from "../../middlewares/checkownerShip.middleware";
import { Cart } from "./cart.model";

const router = Router();


router.route("/").post(authMiddleware , validateReqBodyForCart(cartSchemaValidation) , createCart);

router.route("/:productId").patch( authMiddleware ,validateReqBodyForCart(updateCartSchemaValidation) , checkOwnerShip(Cart) , updateCart);   

router.route("/:productId").delete(authMiddleware , deleteProduct);

router.route("/").get(authMiddleware , getCart);

export default router;