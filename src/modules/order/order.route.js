import { Router } from "express";
import { createOrder, getMyOrders } from "./order.controller";
import authMiddleware from "../../middlewares/auth.middleware";


const router = Router();


router.route("/").post(authMiddleware , createOrder);

router.route("/orders/my").get(authMiddleware , getMyOrders);




export default router;