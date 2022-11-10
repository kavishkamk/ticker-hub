import { CommonError } from "@tickethub-kv/common";
import mongoose from "mongoose";

import { app } from "./app";

const port = 4000;

const start = () => {

    if (!process.env.MONGO_URI) {
        throw new CommonError(404, "MONGO_URI must be defined");
    };

    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            app.listen(port, () => {
                console.log("server start on port " + 4000);
            });
        })
        .catch((err) => {
            console.error("Could not connect to the database : " + err);
        });
};

start();