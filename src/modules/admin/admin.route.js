import { Router } from "express";
import { getAllOrdersForAdmin, getDetailsOfOrder, updateSpecificOrderStatus } from "./admin.controller";
import { updateOrderStatusSchema } from "./admin.validation";
import { validateReqBodyForOrder } from "./admin.validation";
import authMiddleware from "../../middlewares/auth.middleware";
import isAdmin from "../../middlewares/isAdmin.middleware.js";

const router = Router();

router.route("/orders").get(getAllOrdersForAdmin);

router.route("/order/:id/status").patch(authMiddleware , isAdmin , validateReqBodyForOrder(updateOrderStatusSchema) , updateSpecificOrderStatus);

router.route("/order/:id/details").get(authMiddleware , isAdmin , getDetailsOfOrder);



export default router;