import { OrderCreatedEvent, publisher, Subjects } from "@tickethub-kv/common";

export class OrderCreatedPublisher extends publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
};