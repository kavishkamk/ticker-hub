import { CommonError } from "@tickethub-kv/common";

import { natsWrapper } from "./nats-wrapper";

const startService = () => {

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

            process.on("SIGTERM", () => natsWrapper.client.close());
            process.on("SIGINT", () => natsWrapper.client.close());
        })
        .catch((err) => {
            console.error("Could not connect to the NATS Streaming Server : " + err);
        });

};

startService();