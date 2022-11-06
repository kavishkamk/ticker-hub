import { Stan } from "node-nats-streaming";

import { Subjects } from "./Subjects";

interface Event {
    subject: Subjects;
    data: any;
};

export abstract class publisher<T extends Event> {

    abstract subject: T["subject"];

    constructor(private client: Stan) { }

    publish(data: T["data"]) {
        this.client.publish(
            this.subject,
            JSON.stringify(data),
            (err, guide) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("published message with guide " + guide);
                };
            }
        );
    };

}