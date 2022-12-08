import { ExpirationCompleateEvent, OrderStatus, TicketUpdatedEvent } from "@tickethub-kv/common";
import mongoose from "mongoose";
import { natsWrapper } from "../../../nats-wrapper";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";
import { ExpirationCompleteListener } from "../expiration-complete-listener";
import { Order } from "../../../models/order";

const setup = async () => {
    // create an instance of the listener
    const listener = new ExpirationCompleteListener(natsWrapper.client);

    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: "ticket",
        price: 10
    });

    await ticket.save();

    const order = Order.build({
        userId: "ddfdf",
        expiresAt: new Date(),
        status: OrderStatus.Created,
        ticket
    });

    await order.save();

    const data: ExpirationCompleateEvent['data'] = {
        orderId: order.id
    };

    // create a facke message object
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return { listener, order, ticket, data, msg };
};

it("update the order status to cancel", async () => {
    const { listener, order, ticket, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const updatedOrder = await Order.findById(order.id);

    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

// it("emit an OrderCancelled event", async () => {
//     const { listener, order, data, msg, ticket } = await setup();

//     await listener.onMessage(data, msg);

//     expect(natsWrapper.client.publish).toHaveBeenCalled();

//     const eventData = JSON.parse(
//         (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
//     );

//     expect(eventData.id).toEqual(order.id);

// });

it("does not call ack if the event has skipped version number", async () => {
    const { listener, order, ticket, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});