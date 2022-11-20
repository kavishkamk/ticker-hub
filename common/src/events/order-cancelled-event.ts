import { Subjects } from "./Subjects";


export interface OrderCancelledEvent {
    subject: Subjects.OrderCancelled;
    version: number;
    data: {
        id: string;
        ticket: {
            id: string;
        };
    };
};