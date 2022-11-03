import mongoose from "mongoose";
import request from "supertest";

import { app } from "../../app";

it("return a 404 if the provided id does not exitsts", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .put(`/api/tickets/${id}`)
        .set("Cookie", global.signin())
        .send({
            title: "sample",
            price: 20
        })
        .expect(404);
});

it("return a 401 if user is not autherized", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: "sample",
            price: 20
        })
        .expect(401);
});

it("return a 401 if the user does not owne the ticket", async () => {
    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
            ticket: "ticket",
            price: 10
        });

    await request(app)
        .put(`/api/tickets/${response.body.ticket.id}`)
        .set("Cookie", global.signin())
        .send({
            ticket: "ticket update",
            price: 20
        })
        .expect(401);
});

it("return 422 if the user provided invalid title or price", async () => {
    const cookie = global.signin();

    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", cookie)
        .send({
            ticket: "ticket",
            price: 10
        });

    await request(app)
        .put(`/api/tickets/${response.body.ticket.id}`)
        .set("Cookie", cookie)
        .send({
            title: "",
            price: 20
        })
        .expect(422);

    await request(app)
        .put(`/api/tickets/${response.body.ticket.id}`)
        .set("Cookie", cookie)
        .send({
            title: "ddddd",
            price: -10
        })
        .expect(422);

});

it("update tickets for valid input", async () => {
    const cookie = global.signin();

    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", cookie)
        .send({
            ticket: "ticket",
            price: 10
        });

    await request(app)
        .put(`/api/tickets/${response.body.ticket.id}`)
        .set("Cookie", cookie)
        .send({
            title: "new title",
            price: 20
        })
        .expect(200);

    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.ticket.id}`)

    expect(ticketResponse.body.ticket.title).toEqual("new title");
    expect(ticketResponse.body.ticket.price).toEqual(20);
});
