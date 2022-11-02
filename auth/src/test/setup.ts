import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import 'jest';
import request from "supertest";
import { app } from "../app";

declare global {
    var getCookie: () => Promise<string[]>;
};

let mongod: MongoMemoryServer;

beforeAll(async () => {
    process.env.JWT_KEY = "HeyGpoe78";
    mongod = await MongoMemoryServer.create();

    const uri = mongod.getUri();

    await mongoose.connect(uri, {});

});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongod.stop();
});

global.getCookie = async () => {
    const email = "test@test.com";
    const password = "password";

    const response = await request(app)
        .post("/api/users/signup")
        .send({
            email,
            password
        })
        .expect(201);

    const cookie = response.get("Set-Cookie");

    return cookie;
};