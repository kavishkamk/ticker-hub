import { CommonError } from "@tickethub-kv/common";
import { NextFunction, Request, Response } from "express";

import { Ticket } from "../models/Ticket";

const createTicket = async (req: Request, res: Response, next: NextFunction) => {

    const { title, price } = req.body;

    const ticket = Ticket.build({
        title,
        price,
        userId: req.currentUser!.id
    });

    try {
        await ticket.save();
    } catch (err) {
        return next(new CommonError(500, "Ticket creation fail"));
    }

    res.status(201)
        .send({ ticket });
};

export { createTicket };