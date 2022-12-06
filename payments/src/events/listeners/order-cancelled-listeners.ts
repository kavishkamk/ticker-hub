import { CommonError, Listener, OrderCancelledEvent, OrderStatus, Subjects } from "@tickethub-kv/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";

import { Order } from "../../models/Order";

export class OrderCancelledListeners extends Listener<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
        const order = await Order.findOne({
            _id: data.id,
            varsion: data.version - 1
        });

        if (!order) {
            throw new CommonError(404, "Order ont found");
        };

        order.set({ status: OrderStatus.Cancelled });

        await order.save();

        msg.ack();
    };
};