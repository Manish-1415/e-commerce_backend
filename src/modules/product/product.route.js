import { Router } from "express";

const router = Router();

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "./product.controller";
import verifyUser from "../../middlewares/jwt.middleware";
import verifyProductManipulation from "../../middlewares/product.middleware";
import {
  productUpdateValidation,
  productUpdationMiddleware,
  productValidation,
  validateProductSchema,
} from "./product.validation";

import { upload } from "../../middlewares/multer.middleware";

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
