import { CommonError } from "@tickethub-kv/common";
import { NextFunction, Request, Response } from "express";

import { Ticket } from "../models/Ticket";

const getTickets = async (req: Request, res: Response, next: NextFunction) => {

    let tickets;

    try {
        tickets = await Ticket.find({});
    } catch (error) {
        return next(new CommonError(500, "Error occured during tickets searching"));
    };

    res.status(200).send({ tickets });

};

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
        .send({ ticket: ticket.toObject({ getters: true }) });
};

const getTicket = async (req: Request, res: Response, next: NextFunction) => {

    let ticket;

    try {
        ticket = await Ticket.findById(req.params.ticketId);
    } catch (err) {
        return next(new CommonError(500, "Internal Server Error"));
    };

    if (!ticket) {
        return next(new CommonError(404, "Not found"));
    };

    res.status(200).json({ ticket: ticket.toObject({ getters: true }) });
};

const updateTicket = async (req: Request, res: Response, next: NextFunction) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        return next(new CommonError(404, "Ticket not found"));
    };

    if (ticket.userId !== req.currentUser!.id) {
        return next(new CommonError(401, "Not Autherized"));
    };

    ticket.set({
        title: req.body.title,
        price: req.body.price
    });

    try {
        await ticket.save();
    } catch (err) {
        return next(new CommonError(500, "Error occured during ticket update"));
    }

    res.status(200).send({ ticket: ticket.toObject({ getters: true }) });

};

export { createTicket, getTicket, getTickets, updateTicket };