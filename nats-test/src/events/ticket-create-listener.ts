import { Message } from "node-nats-streaming";

import { Listener } from "./base-listener";
import { Subjects } from "./Subjects";
import { TicketCreatedEvent } from "./ticket-created-event";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    subjectName: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = "lisnter-queue-group";

    onMessage(data: TicketCreatedEvent["data"], msg: Message) {
        console.log("Event Reserved! " + JSON.stringify(data));

        msg.ack();
    };
}