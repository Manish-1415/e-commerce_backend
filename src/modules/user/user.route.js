import { Router } from "express";
import {registerUser, updateUser} from "./user.controller.js";
import { updateUserMiddleware, userValidation, userValidationMiddleware } from "./user.validation.js";
import { upload } from "../../middlewares/multer.middleware.js";
import verifyUser from "../../middlewares/jwt.middleware.js";

const router = Router();

router.post(
  "/register",
  userValidationMiddleware(userValidation),
  upload.single("avatar"),
  registerUser
);

router.patch("/update", verifyUser , updateUserMiddleware , upload.single("avatar") , updateUser);

export default router;
