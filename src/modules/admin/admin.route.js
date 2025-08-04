import { Router } from "express";
import { getAllOrdersForAdmin, getDetailsOfOrder, getUserById, updateSpecificOrderStatus } from "./admin.controller";
import { updateOrderStatusSchema } from "./admin.validation";
import { validateReqBodyForOrder } from "./admin.validation";
import authMiddleware from "../../middlewares/auth.middleware";
import isAdmin from "../../middlewares/isAdmin.middleware.js";
import { getUsersForAdmin } from "./admin.controller";

const router = Router();

// Order Related Routes
router.route("/orders").get(getAllOrdersForAdmin);

router.route("/order/:id/status").patch(authMiddleware , isAdmin , validateReqBodyForOrder(updateOrderStatusSchema) , updateSpecificOrderStatus);

router.route("/order/:id/details").get(authMiddleware , isAdmin , getDetailsOfOrder);

// User related routes
router.route("/users/").get(authMiddleware , isAdmin , getUsersForAdmin);

router.route("/user/:id").get(authMiddleware , isAdmin , getUserById)

export default router;