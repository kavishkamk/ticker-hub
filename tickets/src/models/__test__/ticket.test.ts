import { Ticket } from "../Ticket";

it("implement the optimistic concurrency control", async () => {
    // create an instance of ticket
    const ticket = Ticket.build({
        title: "concert",
        price: 5,
        userId: "123"
    });

    // save the ticket to db
    await ticket.save();

    // fetch the ticket twise
    const firstInstance = await Ticket.findById(ticket.id);
    const secondInstance = await Ticket.findById(ticket.id);

    firstInstance!.set({ price: 10 });
    secondInstance!.set({ price: 15 });

    await firstInstance!.save();

    // save the second fetched ticket and expect an error
    try {
        await secondInstance!.save();
    } catch (err) {
        return;
    };

    throw new Error("Should not reach this point");
});

it("increments the version in multiple updates", async () => {
    // create an instance of ticket
    const ticket = Ticket.build({
        title: "concert",
        price: 5,
        userId: "123"
    });

    await ticket.save();
    expect(ticket.version).toEqual(0);
    await ticket.save();
    expect(ticket.version).toEqual(1);
    await ticket.save();
    expect(ticket.version).toEqual(2);
});