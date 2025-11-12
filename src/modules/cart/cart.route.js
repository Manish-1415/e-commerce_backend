import { Router } from "express";
import { createCart, deleteProductFromCart, getCart, updateCart } from "./cart.controller.js";
import checkUserRole from "../../middlewares/checkIfRoleIsUser.middleware.js";
import verifyUser from "../../middlewares/jwt.middleware.js";
import { addToCartSchema, cartSchemaMiddleware } from "./cart.validation.js";

const router = Router();

router.post("/", verifyUser , checkUserRole , cartSchemaMiddleware(addToCartSchema) , createCart);

router.put("/", verifyUser , checkUserRole , cartSchemaMiddleware(addToCartSchema) , updateCart);

router.delete("/:id", verifyUser , checkUserRole , deleteProductFromCart);

router.get("/", verifyUser , checkUserRole , getCart);

export default router;