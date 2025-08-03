import { Router } from "express";
import { createOrder } from "./order.controller";

const router = Router();


router.route("/").post(createOrder);




export default router;