import express, { NextFunction, Request, Response } from "express";
import { json } from "body-parser";
import { currentUserMiddleware, errorMiddleware, unhandledRouteMiddleWare } from "@tickethub-kv/common";

import ordersRouter from "./routes/order-routes";

const app = express();

app.use(json());

app.use(currentUserMiddleware);

app.use("/api/orders", ordersRouter);

app.use(unhandledRouteMiddleWare);

app.use(errorMiddleware);

export { app };