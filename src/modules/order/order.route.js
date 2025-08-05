import { Router } from "express";
import { createOrder, getMyOrderById, getMyOrders } from "./order.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import checkIfHeIsUser from "../../middlewares/isUser.middleware.js";
import { Order } from "./order.model.js";
import checkOwnerShip from "../../middlewares/checkownerShip.middleware.js";

const router = Router();

router.route("/").post(authMiddleware, checkIfHeIsUser, createOrder);

router.route("/orders/my").get(authMiddleware, getMyOrders);

router
  .route("/orders/:id")
  .get(authMiddleware, checkOwnerShip(Order), getMyOrderById);
//used ownership middleware here ,

export default router;
