import { OrderCancelledEvent, publisher, Subjects } from "@tickethub-kv/common";

export class OrderCancelledPublisher extends publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
};