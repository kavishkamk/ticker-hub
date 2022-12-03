import { CommonError, ExpirationCompleateEvent, Listener, OrderStatus, Subjects } from "@tickethub-kv/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { OrderCancelledPublisher } from "../publisher/OrderCancelledPublisher";

import { QueueGroupName } from "./queue-group-names";

export class ExpirationCompleteListener extends Listener<ExpirationCompleateEvent> {
    queueGroupName = QueueGroupName;
    subject: Subjects.ExpirationCompleate = Subjects.ExpirationCompleate;

    async onMessage(data: ExpirationCompleateEvent["data"], msg: Message) {
        const order = await Order.findById(data.orderId).populate("ticket");

        if (!order) {
            throw new Error("Order not found");
        }

        order.set({
            status: OrderStatus.Cancelled,
        });
        await order.save();
        await new OrderCancelledPublisher(this.client).publish({
            id: order.id,
            version: order.version,
            ticket: {
                id: order.ticket.id,
            },
        });

        msg.ack();
    }
};