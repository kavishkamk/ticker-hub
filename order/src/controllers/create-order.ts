import { CommonError, OrderStatus } from "@tickethub-kv/common";
import { Response, Request, NextFunction } from "express";
import { OrderCreatedPublisher } from "../events/publisher/OrderCreatedPublisher";

import { Order } from "../models/order";
import { Ticket } from "../models/ticket";
import { natsWrapper } from "../nats-wrapper";

const EXPIRATION_WINDOW_SECOND = 15 * 60;

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { ticketId } = req.body;

    let ticket;
    try {
        ticket = await Ticket.findById(ticketId).exec();
    } catch (err) {
        return next(new CommonError(500, "Unknown Error. Please try again later"));
    };

    if (!ticket) {
        return next(new CommonError(404, "Ticket not found"));
    };

    const isTicketReserved = await ticket.isReserved();

    if (isTicketReserved) {
        return next(new CommonError(400, "Ticket already reserved"));
    };

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECOND);


    const order = Order.build({
        userId: req.currentUser!.id,
        expiresAt: expiration,
        status: OrderStatus.Created,
        ticket
    });

    try {
        await order.save();
    } catch (err) {
        return next(new CommonError(500, "Unknown Error. Please try again later"));
    };

    new OrderCreatedPublisher(natsWrapper.client).publish({
        id: order.id,
        status: order.status,
        userId: order.userId,
        expiresAt: order.expiresAt.toISOString(),
        ticket: {
            id: order.ticket.id,
            price: order.ticket.price
        }
    });

    res.status(201).json({ order });
};

export { createOrder };