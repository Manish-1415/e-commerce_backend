import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors";

const app = express();


app.use(express.static("public"))

app.use(express.json())

app.use(express.urlencoded({extended : true}))

app.use(cookieParser())

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))







import errorMiddleware from "./middlewares/err.middleware.js";

app.use(errorMiddleware);



export default app;