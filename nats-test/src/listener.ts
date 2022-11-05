import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

console.clear();

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
    url: "http://localhost:4222"
});

stan.on("connect", () => {
    console.log("listner connect to the nats");

    stan.on("close", () => {
        console.log("NATS connection closed");
        process.exit();
    });

    const opts = stan.subscriptionOptions()
        .setManualAckMode(true)
        .setDeliverAllAvailable()
        .setDurableName("sample-service");

    const subscription = stan.subscribe("ticket:created", "lisnter-queue-group", opts);

    subscription.on("message", (msg: Message) => {
        if (typeof msg.getData() === "string") {
            console.log('Received a message [' + msg.getSequence() + '] ' + msg.getData());
        }

        msg.ack();
    });
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());