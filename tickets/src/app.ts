import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { currentUserMiddleware, errorMiddleware, requireAuth, unhandledRouteMiddleWare } from "@tickethub-kv/common";

import ticketRouter from "./routes/ticket-routes";

const app = express();

// trafic proxied throuh the ingress-nginx (throuh proxy)
app.set('trust proxy', true);

app.use(json());

app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test"
}));

app.use(currentUserMiddleware);

app.use("/api/tickets", ticketRouter);

app.use(unhandledRouteMiddleWare);

app.use(errorMiddleware);


export { app };