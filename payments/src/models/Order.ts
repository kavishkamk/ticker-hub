import { OrderStatus } from "@tickethub-kv/common";
import { Document, Model, model, Schema } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface OrderAttrs {
    id: string;
    orderStatus: OrderStatus;
    version: number;
    userId: string;
    price: number;
};

interface OrderDoc extends Document {
    orderStatus: OrderStatus;
    version: number;
    userId: string;
    price: number;
};

interface OrderModel extends Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc;
};

const orderSchema = new Schema({
    orderId: { type: String, require: [true, "Order Id required"] },
    orderStatus: { type: String, require: [true, "Order Status required"] },
    price: { type: Number, require: [true, "Price required"] }
});

orderSchema.set("versionKey", "version");
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order({
        _id: attrs.id,
        price: attrs.price,
        version: attrs.version,
        orderStatus: attrs.orderStatus
    });
};

const Order = model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };