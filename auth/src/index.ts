import express from "express";
import { json } from "body-parser";

import usersRouter from "./routes/users-route";
import errorMiddleware from "./middleware/error-middleware";
import unhandledRouteMiddleWare from "./middleware/unhandled-route-middleware";
import mongoose from "mongoose";

const app = express();

const port = 4000;

app.use(json());

app.use("/api/users", usersRouter);

// handle unhandled routes
app.use(unhandledRouteMiddleWare);

// default error handler
app.use(errorMiddleware);

const start = async () => {
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