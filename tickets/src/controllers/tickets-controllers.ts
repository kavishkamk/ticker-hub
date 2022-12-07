import { CommonError } from "@tickethub-kv/common";
import { NextFunction, Request, Response } from "express";

import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";
import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated-publisher";
import { Ticket } from "../models/Ticket";
import { natsWrapper } from "../nats-wrapper";

const getTickets = async (req: Request, res: Response, next: NextFunction) => {

    let tickets;

    try {
        tickets = await Ticket.find({ orderId: undefined });
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
    };

    await new TicketCreatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
        version: ticket.version
    });

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

    res.status(200).send({ ticket: ticket.toObject({ getters: true }) });
};

const updateTicket = async (req: Request, res: Response, next: NextFunction) => {
    const ticket = await Ticket.findById(req.params.ticketId);

    if (!ticket) {
        return next(new CommonError(404, "Ticket not found"));
    };

    if (ticket.orderId) {
        throw new CommonError(400, "cannn't edit reserved ticket");
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
    };

    await new TicketUpdatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
        version: ticket.version
    });

    res.status(200).send({ ticket: ticket.toObject({ getters: true }) });

};

export { createTicket, getTicket, getTickets, updateTicket };