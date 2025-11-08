import { Router } from "express";
import { createCart, deleteProductFromCart, getCart, updateCart } from "./cart.controller";
import checkUserRole from "../../middlewares/checkIfRoleIsUser.middleware";
import verifyUser from "../../middlewares/jwt.middleware";
import { addToCartSchema, cartSchemaMiddleware } from "./cart.validation";

const router = Router();

router.post("/", verifyUser , checkUserRole , cartSchemaMiddleware(addToCartSchema) , createCart);

router.put("/", verifyUser , checkUserRole , cartSchemaMiddleware(addToCartSchema) , updateCart);

router.delete("/:id", verifyUser , checkUserRole , deleteProductFromCart);

router.get("/", verifyUser , checkUserRole , getCart);

export default router;