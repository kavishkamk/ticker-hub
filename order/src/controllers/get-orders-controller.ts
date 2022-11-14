import { CommonError } from "@tickethub-kv/common";
import { Response, Request, NextFunction } from "express";

import { Order } from "../models/order";

const getOrders = async (req: Request, res: Response, next: NextFunction) => {

    let orders;

    try {
        orders = await Order.find({
            userId: req.currentUser!.id
        }).populate("ticket");
    } catch (err) {
        return next(new CommonError(500, "Faild to retrive tickets, Please try again later"));
    }

    res.status(200)
        .json({ orders });

};

export { getOrders };