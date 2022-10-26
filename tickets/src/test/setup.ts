import "jest";
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from "mongoose";

import { app } from "../app";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
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