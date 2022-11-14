import request from "supertest";

import { Ticket } from "../../models/ticket";
import { app } from "../../app";

const buildTicket = async () => {
    const ticket = Ticket.build({
        title: "title",
        price: 10
    });

    await ticket.save();
    return ticket;
};

it("fetch tickets form paticular user", async () => {
    const ticket1 = await buildTicket();
    const ticket2 = await buildTicket();
    const ticket3 = await buildTicket();

    const userOne = global.signin();
    const userTwo = global.signin();

    await request(app)
        .post("/api/orders")
        .set("Cookie", userOne)
        .send({ ticketId: ticket1.id })
        .expect(201);

    const { body: orderOne } = await request(app)
        .post("/api/orders")
        .set("Cookie", userTwo)
        .send({ ticketId: ticket2.id })
        .expect(201);

    const { body: orderTwo } = await request(app)
        .post("/api/orders")
        .set("Cookie", userTwo)
        .send({ ticketId: ticket3.id })
        .expect(201);

    const response = await request(app)
        .get("/api/orders")
        .set("Cookie", userTwo)
        .expect(200);

    expect(response.body.orders.length).toEqual(2);
    expect(response.body.orders[0].id).toEqual(orderOne.id);
    expect(response.body.orders[1].id).toEqual(orderTwo.id);

});