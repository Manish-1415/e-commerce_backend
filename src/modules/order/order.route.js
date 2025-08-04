import { Router } from "express";
import { createOrder, getMyOrderById, getMyOrders } from "./order.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import checkIfHeIsUser from "../../middlewares/isUser.middleware";
import { Order } from "./order.model";
import checkOwnerShip from "../../middlewares/checkownerShip.middleware";

const router = Router();

router.route("/").post(authMiddleware, checkIfHeIsUser, createOrder);

router.route("/orders/my").get(authMiddleware, getMyOrders);

router
  .route("/orders/:id")
  .get(authMiddleware, checkOwnerShip(Order), getMyOrderById);
//used ownership middleware here ,

export default router;
