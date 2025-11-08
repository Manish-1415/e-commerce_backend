import { Router } from "express";
import verifyUser from "../../middlewares/jwt.middleware";
import checkUserRole from "../../middlewares/checkIfRoleIsUser.middleware";
import { orderValidationMiddleware } from "./order.validation";
import { cancelTheOrder, createOrder, getAllOrders, getSpecificOrder } from "./order.controller";

const router = Router();

router.post("/", verifyUser , checkUserRole , orderValidationMiddleware , createOrder);

router.get("/", verifyUser , checkUserRole , getAllOrders);

router.get("/:id", verifyUser , checkUserRole , getSpecificOrder);

router.delete("/:id", verifyUser , checkUserRole , cancelTheOrder);

export default router;