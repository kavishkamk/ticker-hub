import { Listener, OrderCancelledEvent, Subjects } from "@tickethub-kv/common";
import { Message } from "node-nats-streaming";

import { QueueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/Ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = QueueGroupName;

    async onMessage(data: { id: string; version: number; ticket: { id: string; }; }, msg: Message): Promise<void> {
        const ticket = await Ticket.findById(data.ticket.id);

        if (!ticket) {
            throw new Error("ticket not found");
        };

        ticket.set({ orderId: undefined });

        await ticket.save();

        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            orderId: ticket.orderId,
            userId: ticket.userId,
            price: ticket.price,
            title: ticket.title,
            version: ticket.version
        });

        msg.ack();
    }
};