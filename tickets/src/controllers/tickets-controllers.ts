import { NextFunction, Request, Response } from "express";

const createTicket = (req: Request, res: Response, next: NextFunction) => {
    res.send({});
};

export { createTicket };