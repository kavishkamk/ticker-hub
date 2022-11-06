import { Subjects } from "./Subjects";

export interface TicketUpdatedEvent {
    subject: Subjects.TicketUpdated;
    data: {
        id: string;
        title: string;
        price: string;
        userId: string;
    };
};