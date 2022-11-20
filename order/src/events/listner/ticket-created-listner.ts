import { Listener, Subjects, TicketCreatedEvent } from "@tickethub-kv/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";

import { QueueGroupName } from "./queue-group-names";

export class TicketCreatedListner extends Listener<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = QueueGroupName;

    async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        const { id, title, price } = data;

        const ticket = Ticket.build({
            id,
            title,
            price
        });

        try {
            await ticket.save();
            msg.ack();
        } catch (err) {

        };
    };
};