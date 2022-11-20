import { Document, model, Model, Schema } from "mongoose";

import { Order, OrderStatus } from "./order";

// an interface that describe the properties
// want to create ticket
interface ITicket {
    id: string;
    title: string;
    price: number;
};

// an interface that describe the propertice
// ticket document has
interface TicketDoc extends Document {
    title: string;
    price: number;
    isReserved(): Promise<boolean>;
};

// an interface that describe the propertice
// ticket modle has
interface TicketModel extends Model<TicketDoc> {
    build: (attrs: ITicket) => TicketDoc;
};

// schema of the ticket
const ticketSchema = new Schema({
    title: {
        type: String,
        require: [true, "title required"]
    },
    price: {
        type: Number,
        require: [true, "price required"],
        min: [0, "price should be > 0"]
    }
});

// set statics method to build
ticketSchema.statics.build = (attrs: ITicket) => {
    return new Ticket({
        _id: attrs.id,
        title: attrs.title,
        price: attrs.price
    });
};

// find the ticket is reserved or not
ticketSchema.methods.isReserved = async function () {
    const existingOrder = await Order.findOne({
        ticket: this,
        status: {
            $in: [
                OrderStatus.Created,
                OrderStatus.AwaitingPayment,
                OrderStatus.Complete
            ]
        }
    });

    return !!existingOrder;
};

const Ticket = model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket, TicketDoc };
