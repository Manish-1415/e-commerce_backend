import { Router } from "express";
import { getAllOrdersForAdmin, updateSpecificOrderStatus } from "./admin.controller";
import { updateOrderStatusSchema } from "./admin.validation";
import { validateReqBodyForOrder } from "./admin.validation";

const router = Router();

router.route("/").get(getAllOrdersForAdmin);

router.route("/:order/status").patch(validateReqBodyForOrder(updateOrderStatusSchema) , updateSpecificOrderStatus);



export default router;