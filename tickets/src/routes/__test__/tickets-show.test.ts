import request from "supertest";
import mongoose from "mongoose";

import { app } from "../../app";

it("returns a 404 if the ticket route not found", async () => {

    const id = new mongoose.Types.ObjectId().toHexString();

    const a = await request(app)
        .get(`/api/tickets/${id}`)
        .expect(404);
});

it("return ticket if the ticket is found", async () => {
    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
            title: "sample",
            price: 10
        })
        .expect(201);

    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.ticket.id}`)
        .expect(200);

    expect(ticketResponse.body.ticket.title).toEqual("sample");
    expect(ticketResponse.body.ticket.price).toEqual(10);

});