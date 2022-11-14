import express from "express";
import { json } from "body-parser";
import { currentUserMiddleware, errorMiddleware, unhandledRouteMiddleWare } from "@tickethub-kv/common";
import cookieSession from "cookie-session";

import ordersRouter from "./routes/order-routes";

const app = express();

app.use(json());

app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test"
}));

app.use(currentUserMiddleware);

app.use("/api/orders", ordersRouter);

app.use(unhandledRouteMiddleWare);

app.use(errorMiddleware);

export { app };