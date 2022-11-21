import request from "supertest";
import mongoose from "mongoose";

import { Ticket } from "../../models/ticket";
import { app } from "../../app";

const buildTicket = async () => {
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: "title",
        price: 10
    });

    await ticket.save();
    return ticket;
};

it("fetch the order", async () => {
    const ticket = await buildTicket();

    const userOne = global.signin();

    const { body: order } = await request(app)
        .post("/api/orders")
        .set("Cookie", userOne)
        .send({ ticketId: ticket.id })
        .expect(201);

    const response = await request(app)
        .delete(`/api/orders/${order.order._id}`)
        .set("Cookie", userOne)
        .send()
        .expect(200);

    expect(response.body.id).toEqual(order.id);

});