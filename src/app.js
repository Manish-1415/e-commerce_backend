import express from "express";

const app = express();


app.use(express.json());



import registerRouter from "./modules/user/user.route.js";



app.use("/api/v1/users", registerRouter); // Redirect to the Router of register


export default app;