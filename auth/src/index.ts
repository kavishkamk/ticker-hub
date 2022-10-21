import mongoose from "mongoose";
import { CommonError } from "./errors/common-error";
import { app } from "./app";

const port = 4000;

const start = async () => {

    if (!process.env.JWT_KEY) {
        console.error("JWT_KEY must be defined");
        throw new CommonError(404, "JWT_KEY must be defined");
    }

    try {
        await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
        console.log("Connected to the database");

        app.listen(port, () => {
            console.log("server listen on port : " + port);
        });

    } catch (err) {
        console.error(err);
    }

}

start();