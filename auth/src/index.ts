import mongoose from "mongoose";
import { CommonError } from "@tickethub-kv/common";

import { app } from "./app";

const port = 4000;

const start = () => {

    if (!process.env.MONGO_URI) {
        throw new CommonError(404, "MONGO_URI must be defined");
    }

    if (!process.env.JWT_KEY) {
        throw new CommonError(404, "JWT_KEY must be defined");
    }

    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to the mongo database");

            app.listen(port, () => {
                console.log("server listen on port : " + port);
            });
        })
        .catch(err => {
            console.error("Could not connected to the database: " + err);
        });
}

start();