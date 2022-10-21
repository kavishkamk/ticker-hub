import request from "supertest";
import { app } from "../../app";

it("return a 200 on successful signup", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(200);
});

it("return a 422 with an invalid email", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "test@gmail",
            password: "iefihfihffh"
        })
        .expect(422);
});

it("return a 422 with an invalid password", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "ie"
        })
        .expect(422);
});

it("return 422 for missing password or email", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com"
        })
        .expect(422);

    await request(app)
        .post("/api/users/signup")
        .send({
            password: "iedfdffdf"
        })
        .expect(422);
});

it("disallow duplicate email address", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(200);

    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(422);
});

it("set a cookies after signup", async () => {
    const response = await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(200);

    expect(response.get("Set-Cookie")).toBeDefined();
});
