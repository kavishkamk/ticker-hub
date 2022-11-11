export enum OrderStatus {
    // when the order is created,
    // but the ticket for the order is still not reserved
    Created = "created",

    // the ticket, try to reserved for the order is already reserved
    // when the user cancelled the order
    // when the ticket expired
    Cancelled = "cancelled",

    // ticket is successfully reserved for the order 
    AwaitingPayment = "awaiting:payment",

    // payment is successfully compleated and ticket is reserved
    Complete = "complete"
};