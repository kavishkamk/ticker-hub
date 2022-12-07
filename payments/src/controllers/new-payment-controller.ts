import { CommonError, OrderStatus } from "@tickethub-kv/common";
import { NextFunction, Request, Response } from "express";
import { Order } from "../models/Order";

import { stripe } from "../../stripe";
import { Payment } from "../models/Payments";
import { PaymentCreatedPublisher } from "../events/publishers/payment-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const newPaymentController = async (req: Request, res: Response, next: NextFunction) => {

    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
        return next(new CommonError(404, "Order not found"));
    };

    console.log(order.userId);
    console.log(req.currentUser!.id);

    if (order.userId.toString() !== req.currentUser!.id) {
        return next(new CommonError(401, "Not autherized error"));
    };

    if (order.orderStatus === OrderStatus.Cancelled) {
        return next(new CommonError(400, "Cannot pay for an cancelled order"));
    };

    // `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/accept-a-payment-charges#web-create-token
    const charge = await stripe.charges.create({
        amount: order.price * 100,
        currency: 'usd',
        source: token
    });

    const payment = Payment.build({
        orderId: orderId,
        stripeId: charge.id
    });

    await payment.save();

    new PaymentCreatedPublisher(natsWrapper.client).publish({
        id: payment.id,
        orderId: payment.orderId,
        striptId: payment.stripeId
    });

    res.send({ id: payment.id });
};

export { newPaymentController };