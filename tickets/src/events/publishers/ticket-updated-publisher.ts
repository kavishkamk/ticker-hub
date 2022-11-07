import { publisher, Subjects, TicketUpdatedEvent } from "@tickethub-kv/common";

export class TicketUpdatedPublisher extends publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
};