import "jest";
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import { app } from "../app";
declare global {
    var signin: () => string[];
};

jest.mock("../nats-wrapper");

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    process.env.JWT_KEY = "dhfdhfudhf";

    mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri(), {});
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongoose.disconnect();
});

global.signin = () => {

    const object = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: "test@test.com"
    };

    const jwtToken = jwt.sign(object, process.env.JWT_KEY!);

    // set session object to json
    const jsonformat = JSON.stringify({ jwt: jwtToken });

    // encode to base 64
    const base64 = Buffer.from(jsonformat).toString("base64");

    return [`session=${base64}`];
};