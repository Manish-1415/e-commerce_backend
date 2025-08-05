import { Router } from "express";
import {
  getAllOrdersForAdmin,
  getDetailsOfOrder,
  getUserById,
  updateSpecificOrderStatus,
} from "./admin.controller.js";
import { updateOrderStatusSchema } from "./admin.validation.js";
import { validateReqBodyForOrder } from "./admin.validation.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import isAdmin from "../../middlewares/isAdmin.middleware.js";
import { getUsersForAdmin } from "./admin.controller.js";

const router = Router();

// Order Related Routes
router.route("/orders").get(authMiddleware, isAdmin, getAllOrdersForAdmin);

router
  .route("/order/:id/status")
  .patch(
    authMiddleware,
    isAdmin,
    validateReqBodyForOrder(updateOrderStatusSchema),
    updateSpecificOrderStatus
  );

router
  .route("/order/:id/details")
  .get(authMiddleware, isAdmin, getDetailsOfOrder);

// User related routes
router.route("/users/").get(authMiddleware, isAdmin, getUsersForAdmin);

router.route("/user/:id").get(authMiddleware, isAdmin, getUserById);

export default router;
