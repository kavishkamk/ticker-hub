import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import 'jest';

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