import { Listener, Subjects, PaymentCreatedEvent, CommonError, OrderStatus } from "@tickethub-kv/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";

import { QueueGroupName } from "./queue-group-names";

export class PaymentCreatedListner extends Listener<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
    queueGroupName = QueueGroupName;

    async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
        const order = await Order.findById(data.orderId);

        if (!order) {
            throw new CommonError(404, "Not found");
        };

        order.set({
            status: OrderStatus.Complete
        });

        await order.save();

        msg.ack();

    };
};