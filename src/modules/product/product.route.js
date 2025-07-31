import { Router } from "express";
import { createProduct } from "./product.controller";
import { validateReqBodyForProduct } from "./product.validation";
import { createProductSchema } from "./product.validation";

const router = Router();

router.route("/").post(validateReqBodyForProduct(createProductSchema) , createProduct);



export default router;