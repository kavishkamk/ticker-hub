import { Document, model, Model, Schema } from "mongoose";
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

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
    version: number;
};

// an interface that describe the propertice
// ticket modle has
interface TicketModel extends Model<TicketDoc> {
    build(attrs: ITicket): TicketDoc;
    findByEvent(event: { id: string, version: number }): Promise<TicketDoc | null>;
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

ticketSchema.set("versionKey", "version");
// ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.pre("save", function (done) {
    // @ts-ignores
    this.$where = {
        version: this.get("version") - 1
    };

    done();
});

ticketSchema.statics.build = (event: { id: string, version: number }) => {
    return Ticket.findOne({
        _id: event.id,
        version: event.version - 1
    });
};

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
