import { OrderCancelledEvent, OrderStatus, Subjects } from "@tickethub-kv/common";
import mongoose from "mongoose";
import { natsWrapper } from "../../../nats-wrapper";
import { Message } from "node-nats-streaming";

import { Ticket } from "../../../models/Ticket";
import { OrderCancelledListener } from "../order-cancelled-listener";

const setup = async () => {
    // create an instance of the listener
    const listener = new OrderCancelledListener(natsWrapper.client);

    const orderId = new mongoose.Types.ObjectId().toHexString();
    const ticket = Ticket.build({
        title: "ticket",
        price: 20,
        userId: "fiufiudfiu"
    });

    ticket.set({ orderId })

    await ticket.save();

    // create a fake data event
    const data: OrderCancelledEvent['data'] = {
        version: 0,
        id: orderId,
        ticket: {
            id: ticket.id
        }
    };

    // create a facke message object
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return { listener, data, msg, ticket, orderId };
};

it("update the ticket, publish the event, and ack the msg", async () => {
    const { listener, ticket, data, msg, orderId } = await setup();

    await listener.onMessage(data, msg);

    const updateTicketed = await Ticket.findById(ticket.id);

    expect(updateTicketed!.orderId).not.toBeDefined();

    expect(msg.ack).toHaveBeenCalled();

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});