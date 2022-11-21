import { TicketCreatedEvent } from "@tickethub-kv/common";
import mongoose from "mongoose";
import { natsWrapper } from "../../../nats-wrapper";
import { TicketCreatedListner } from "../ticket-created-listner";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";

const setup = async () => {
    // create an instance of the listener
    const listener = new TicketCreatedListner(natsWrapper.client);

    // create a fake data event
    const data: TicketCreatedEvent['data'] = {
        version: 0,
        id: new mongoose.Types.ObjectId().toHexString(),
        title: "sample",
        userId: new mongoose.Types.ObjectId().toHexString(),
        price: 100
    };

    // create a facke message object
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return { listener, data, msg };
};

it("create and saves a ticket", async () => {
    const { listener, data, msg } = await setup();

    // call the on message function with data + msg
    await listener.onMessage(data, msg);

    const ticket = await Ticket.findById(data.id);

    expect(ticket).toBeDefined();
    expect(ticket!.title).toEqual(data.title);
    expect(ticket!.price).toEqual(data.price);
});

it("acks the message", async () => {
    const { listener, data, msg } = await setup();

    // call the onMessage function with the data object + msg Object
    await listener.onMessage(data, msg);

    // write assertion to make sure ack function is called
    expect(msg.ack).toHaveBeenCalled();

});