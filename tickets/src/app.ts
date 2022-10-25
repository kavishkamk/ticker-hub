import express, { NextFunction, Request, Response } from "express";
import { json } from "body-parser";

const app = express();

app.use(json());

app.use("/api/tickets", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ ok: "ok" });
});


export { app };