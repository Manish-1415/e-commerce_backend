import express from "express";

const app = express();


app.use(express.json());



import registerRouter from "./modules/user/user.route.js";
import loginRouter from "./modules/auth/auth.route.js";


app.use("/api/v1/users", registerRouter); // Redirect to the Router of register

app.use("/api/v1/users", loginRouter); // Redirect to login router


export default app;