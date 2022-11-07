import { Subjects, publisher, TicketCreatedEvent } from "@tickethub-kv/common";

export class TicketCreatedPublisher extends publisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
};