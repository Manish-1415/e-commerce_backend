import dotenv from "dotenv"
dotenv.config({path : "./.env"})

import app from "./app.js"
import connectDB from "./DB/db_connect.js"

const port = process.env.PORT || 5000;

connectDB()
.then( () => {
    app.listen(port , () => {
        console.log(`App is listening on port ${port}`);
    })
} )
.catch( (err) => console.log(err) );
