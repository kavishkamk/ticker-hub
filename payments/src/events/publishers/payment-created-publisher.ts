import { PaymentCreatedEvent, publisher, Subjects } from "@tickethub-kv/common";

export class PaymentCreatedPublisher extends publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
};