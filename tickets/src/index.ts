import mongoose from "mongoose";

import { app } from "./app";

const port = 4000;


const start = () => {

    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI must be defined");
    }

    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to the database");
            app.listen(port, () => {
                console.log("Server start on Port : " + port);
            });
        })
        .catch(err => {
            console.log("Could not connect database : " + err);
        });
};

start();