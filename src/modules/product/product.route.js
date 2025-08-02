import { Router } from "express";
import { createProduct, getProductById } from "./product.controller";
import { validateReqBodyForProduct } from "./product.validation";
import { createProductSchema } from "./product.validation";
import { getAllProducts } from "./product.controller";
import {upload} from "../../middlewares/multer.middleware"
import { updateProductById } from "./product.controller";

const router = Router();

router.route("/").post(validateReqBodyForProduct(createProductSchema) , upload.single("image") , createProduct); // Only Admin can perform

router.route("/").get(getAllProducts); // User , Admin , and any other who is not register also Can Perform this operation

router.route("/:id").get(getProductById);

router.route("/:id").put(upload.single("image"),updateProductById);


export default router;