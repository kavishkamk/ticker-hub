import { Listener, Subjects, TicketUpdatedEvent } from "@tickethub-kv/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { QueueGroupName } from "./queue-group-names";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
    queueGroupName = QueueGroupName;

    async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
        const ticket = await Ticket.findOne({
            _id: data.id,
            version: data.version - 1
        });

        if (!ticket) {
            throw new Error("Ticket not found");
        };

        const { title, price, version } = data;

        ticket.set({ title, price, version });

        try {
            await ticket.save();
            msg.ack();
        } catch (err) {
            throw err;
        };
    };

};