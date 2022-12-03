import { ExpirationCompleateEvent, publisher, Subjects } from "@tickethub-kv/common";

export class ExpirationCompletePublisher extends publisher<ExpirationCompleateEvent> {
    subject: Subjects.ExpirationCompleate = Subjects.ExpirationCompleate;
};