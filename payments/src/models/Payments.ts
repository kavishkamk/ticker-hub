import { Document, model, Model, Schema } from "mongoose";

interface PaymentsAttrs {
    orderId: string;
    stripeId: string;
};

interface PaymentDoc extends Document {
    orderId: string;
    stripeId: string;
};

interface PaymentModel extends Model<PaymentModel> {
    build(attrs: PaymentsAttrs): PaymentDoc;
};

const paymentSchema = new Schema({
    orderId: {
        type: String,
        require: [true, "order Id required"]
    },
    stripeId: {
        type: String,
        require: [true, "stript id required"]
    }
});

paymentSchema.statics.build = (payment: PaymentsAttrs) => {
    return new Payment(payment);
};

const Payment = model<PaymentDoc, PaymentModel>("payment", paymentSchema);

export { Payment };