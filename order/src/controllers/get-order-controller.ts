import { CommonError } from "@tickethub-kv/common";
import { Response, Request, NextFunction } from "express";
import { Order } from "../models/order";

const getOrder = async (req: Request, res: Response, next: NextFunction) => {

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

    res.status(200)
        .json(order);

};

export { getOrder };