import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app = express();

app.use(express.static("public/temp"));

app.use(express.json());

app.use(express.urlencoded({ extended: true })); // used to parse the data which will come from url like a product id

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true, // it allows sending cookies & jwt tokens in req for cross origin req
  })
);

// routes
import registerUserRouter from "./modules/user/user.route.js";
import productRouter from "./modules/product/product.route.js"

app.use("/api/v1/user", registerUserRouter);

app.use("/api/v1/products", productRouter);

// err middleware import in the last.

import errorMiddleware from "./middlewares/err.middleware.js";

app.use(errorMiddleware);

export default app;
