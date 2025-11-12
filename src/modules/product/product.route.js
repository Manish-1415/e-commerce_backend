import { Router } from "express";

const router = Router();

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "./product.controller.js";
import verifyUser from "../../middlewares/jwt.middleware.js";
import verifyProductManipulation from "../../middlewares/product.middleware.js";
import {
  productUpdateValidation,
  productUpdationMiddleware,
  productValidation,
  validateProductSchema,
} from "./product.validation.js";

import { upload } from "../../middlewares/multer.middleware.js";

router.post(
  "/",
  verifyUser,
  verifyProductManipulation,
  validateProductSchema(productValidation),
  upload.single("image"),
  createProduct
);

router.patch(
  "/:id",
  verifyUser,
  verifyProductManipulation,
  productUpdationMiddleware(productUpdateValidation),
  upload.single("image"),
  updateProduct
);

router.delete("/:id", verifyUser, verifyProductManipulation, deleteProduct);

router.get("/:id", getProductById);

router.get("/", getAllProducts);

export default router;
