import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import app from "./app.js";
import connectDB from "./db/db.connection.js";

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    const server = app.listen(port, () => {
      console.log(`Server Started SuccessFully on ${port} Port`);
    });

    server.on("error", (err) => {
      console.log(err);
    });
  })
  .catch((err) => {
    console.log(err);
  });
