import { OrderCreatedEvent, OrderStatus, Subjects } from "@tickethub-kv/common";
import mongoose from "mongoose";
import { natsWrapper } from "../../../nats-wrapper";
import { Message } from "node-nats-streaming";

import { OrderCreatedListener } from "../order-created-listener";
import { Ticket } from "../../../models/Ticket";

const setup = async () => {
    // create an instance of the listener
    const listener = new OrderCreatedListener(natsWrapper.client);

    const ticket = Ticket.build({
        title: "ticket",
        price: 10,
        userId: "fiufiudfiu"
    });

    await ticket.save();

    // create a fake data event
    const data: OrderCreatedEvent['data'] = {
        version: 0,
        id: new mongoose.Types.ObjectId().toHexString(),
        userId: new mongoose.Types.ObjectId().toHexString(),
        status: OrderStatus.Created,
        expiresAt: "dhfhf",
        ticket: {
            id: ticket.id,
            price: ticket.price
        }
    };

    // create a facke message object
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return { listener, data, msg, ticket };
};

it("set the userId of the ticket", async () => {
    const { listener, ticket, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.orderId).toEqual(data.id);
});

it("acks the message", async () => {
    const { listener, ticket, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});


it("publish a ticket update event", async () => {
    const { listener, ticket, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(natsWrapper.client.publish).toHaveBeenCalled();

    const ticketUpdatedData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);

    expect(data.id).toEqual(ticketUpdatedData.orderId);
});