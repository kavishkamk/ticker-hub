import request from "supertest";
import { app } from "../../app";

it("fail when given email not provided", async () => {
    await request(app)
        .post("/api/users/signin")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(401);
});

it("fails if incorrect password supplied", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(200);

    await request(app)
        .post("/api/users/signin")
        .send({
            email: "test@test.com",
            password: "passwofw"
        })
        .expect(401);
});

it("response with a cookie with valid login", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(200);

    const response = await request(app)
        .post("/api/users/signin")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(200);

    expect(response.get("Set-Cookie")).toBeDefined();
});

