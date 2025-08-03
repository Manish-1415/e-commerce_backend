import express from "express";
import cookieParser from "cookie-parser";

const app = express();


app.use(express.json());

app.use(cookieParser());


import registerRouter from "./modules/user/user.route.js";
import authRouter from "./modules/auth/auth.route.js";
import renewTokenRouter from "./modules/renewAccessToken/renewToken.route.js";
import cartRouter from "./modules/cart/cart.route.js";
import orderRouter from "./modules/order/order.route.js";

app.use("/api/v1/users", registerRouter); // Redirect to the Router of register

app.use("/api/v1/users", authRouter); // Redirect to login router

app.use("/auth", renewTokenRouter); // Redirect to the route of renewAccessToken

app.use("/api/cart", cartRouter);

app.use("/api/checkout", orderRouter);

export default app;