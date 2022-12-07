import { CommonError } from "@tickethub-kv/common";
import mongoose from "mongoose";

import { app } from "./app";
import { ExpirationCompleteListener } from "./events/listner/expiration-complete-listener";
import { PaymentCreatedListner } from "./events/listner/payment-created-listener";
import { TicketCreatedListner } from "./events/listner/ticket-created-listner";
import { TicketUpdatedListener } from "./events/listner/ticket-updated-listener";
import { natsWrapper } from "./nats-wrapper";

const port = 4000;

const start = () => {

    if (!process.env.MONGO_URI) {
        throw new CommonError(404, "MONGO_URI must be defined");
    };

    if (!process.env.JWT_KEY) {
        throw new CommonError(404, "JWT_KEY must be defined");
    }

    if (!process.env.NATS_CLIENT_ID) {
        throw new CommonError(404, "NATS_CLIENT_ID must be defined");
    }

    if (!process.env.NATS_URL) {
        throw new CommonError(404, "JNATS_URL must be defined");
    }

    if (!process.env.NATS_CLUSTER_ID) {
        throw new CommonError(404, "NATS_CLUSTER_ID must be defined");
    }

    // connect to the nats-streaming-server
    natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL)
        .then(() => {

            // gracefull shout down
            natsWrapper.client.on("close", () => {
                console.log("NATS connection closed");
                process.exit();
            });

            new TicketCreatedListner(natsWrapper.client).listen();
            new TicketUpdatedListener(natsWrapper.client).listen();
            new ExpirationCompleteListener(natsWrapper.client).listen();
            new PaymentCreatedListner(natsWrapper.client).listen();

            process.on("SIGTERM", () => natsWrapper.client.close());
            process.on("SIGINT", () => natsWrapper.client.close());

            mongoose.connect(process.env.MONGO_URI!)
                .then(() => {
                    app.listen(port, () => {
                        console.log("server start on port " + 4000);
                    });
                })
                .catch((err) => {
                    console.error("Could not connect to the database : " + err);
                });
        })
        .catch((err) => {
            console.error("Could not connect to the NATS Streaming Server : " + err);
        });
};

start();