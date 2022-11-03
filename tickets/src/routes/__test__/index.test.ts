import request from "supertest";

import { app } from "../../app";

const createTicket = () => {
    return request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
            ticket: "ticket",
            price: 10
        });
};

it("can fetch a list of a tickets", async () => {
    await createTicket();
    await createTicket();
    await createTicket();

    const response = await request(app)
        .get("/api/tickets")
        .expect(200);

    expect(response.body.tickets.length).toEqual(3);
});