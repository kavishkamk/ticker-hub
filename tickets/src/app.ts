import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { currentUserMiddleware } from "@tickethub-kv/common";

import { ticketRouter } from "./routes/ticket-routes";

const app = express();

// trafic proxied throuh the ingress-nginx (throuh proxy)
app.set('trust proxy', true);

app.use(json());

app.use(cookieSession({
    signed: false, // disable cookes encription
    secure: process.env.NODE_ENV !== "test"
}));

// check current user
app.use(currentUserMiddleware);

app.use("/api/tickets", ticketRouter);


export { app };