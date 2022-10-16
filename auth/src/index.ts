import express from "express";
import { json } from "body-parser";

import usersRouter from "./routes/users-route";
import errorMiddleware from "./middleware/error-middleware";
import unhandledRouteMiddleWare from "./middleware/unhandled-route-middleware";

const app = express();

const port = 4000;

app.use(json());

app.use("/api/users", usersRouter);

// handle unhandled routes
app.use(unhandledRouteMiddleWare);

// default error handler
app.use(errorMiddleware);

app.listen(port, () => {
    console.log("server listen on port : " + port);
});