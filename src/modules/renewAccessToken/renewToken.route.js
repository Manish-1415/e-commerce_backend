import { Router } from "express";
import renewAccessToken from "./renewToken.controller";

const router = Router();


router.route("/refresh").post(renewAccessToken);



export default router;