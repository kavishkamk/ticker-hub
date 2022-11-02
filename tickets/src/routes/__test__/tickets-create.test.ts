import request from "supertest";

import { app } from "../../app";
import { Ticket } from "../../models/Ticket";

it("has a route handler to lisnt to /api/tickets for post request", async () => {
    const response = await request(app)
        .post("/api/tickets")
        .send({});

    expect(response.statusCode).not.toEqual(404);
});

it("it can only can access if the user is signed", async () => {
    const response = await request(app)
        .post("/api/tickets")
        .send({});

    expect(response.statusCode).toEqual(401);
});

it("return a status other than 401 if your is signin", async () => {
    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({});

    expect(response.statusCode).not.toEqual(401);
});

it("it return a error if invalid title is provided", async () => {
    await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
            title: "",
            price: 10
        }).expect(422);

    await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
            price: 10
        }).expect(422);
});

it("it return a error if invalid price is provided", async () => {

    await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
            title: "sample title",
            price: -10
        }).expect(422);

    await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
            title: "sample title"
        }).expect(422);
});

it("it create a tickets with valid inputs", async () => {

    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
            title: "sample",
            price: 22.5
        })
    expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].title).toEqual("sample");

});