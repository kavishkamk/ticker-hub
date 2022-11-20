import { Response, Request, NextFunction } from "express";
import { CommonError } from "@tickethub-kv/common";

import { Order, OrderStatus } from "../models/order";
import { OrderCancelledPublisher } from "../events/publisher/OrderCancelledPublisher";
import { natsWrapper } from "../nats-wrapper";

const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {

    let order;

    try {
        order = await Order.findById(req.params.id).populate("ticket").exec();
    } catch (err) {
        return next(new CommonError(500, "Internal Server error"));
    };

    if (!order) {
        return next(new CommonError(404, "Ticket not found"));
    };

    if (order.userId !== req.currentUser!.id) {
        return next(new CommonError(401, "Unautherized access"));
    };

    order.status = OrderStatus.Cancelled;

    try {
        order = await order.save();
    } catch (err) {
        return next(new CommonError(500, "Internal Server error"));
    };

    new OrderCancelledPublisher(natsWrapper.client).publish({
        id: order.id,
        ticket: {
            id: order.ticket.id,
        }
    });

    res.status(200)
        .json(order);

};

export { deleteOrder };