import { Router } from "express";
import verifyUser from "../../middlewares/jwt.middleware.js";
import checkIfUserIsAdmin from "./admin.middleware.js";
import {
  deleteOrder,
  deleteUser,
  getAllOrders,
  getAllUsers,
  getSingleOrder,
  getSingleUser,
  updateOrder,
} from "./admin.controller.js";

const router = Router();

router.get("/users", verifyUser, checkIfUserIsAdmin, getAllUsers);

router.get("/users/:id", verifyUser, checkIfUserIsAdmin, getSingleUser);

router.get("/orders/", verifyUser, checkIfUserIsAdmin, getAllOrders);

router.get("/orders/:id", verifyUser, checkIfUserIsAdmin, getSingleOrder);

router.delete("/users/:id", verifyUser, checkIfUserIsAdmin, deleteUser);

router.delete("/users/:id", verifyUser, checkIfUserIsAdmin, deleteOrder);

router.patch("/orders/:id", verifyUser, checkIfUserIsAdmin, updateOrder);

export default router;
