import { Router } from "express";
import registerUser from "./user.controller";

const router = Router();

router.route("/register").post(registerUser);