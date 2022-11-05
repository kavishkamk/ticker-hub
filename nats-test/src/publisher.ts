import nats from "node-nats-streaming";

console.clear();

const stan = nats.connect("ticketing", "abc", {
    url: "http://localhost:4222"
});

stan.on("connect", () => {
    console.log("connected to the nats");

    const data = JSON.stringify({
        id: "123",
        title: "title",
        price: 10
    });

    stan.publish("ticket:created", data, (err, guide) => {
        if (err) {
            console.log(err);
        } else {
            console.log("published message with guide " + guide);
        };
    });
});

