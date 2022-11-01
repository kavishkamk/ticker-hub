import request from "supertest";

import { app } from "../../app";

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

it("it return a error if invalid email is provided", async () => {

});

it("it return a error if invalid price is provided", async () => {

});

it("it create a tickets with valid inputs", async () => {

});