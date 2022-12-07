import Router from "next/router";

import useRequest from "../../hooks/use-request";

const TicketShow = ({ ticket }) => {
  const { sendRequest, errors } = useRequest();

  return (
    <div>
      <h1>{ticket.title}</h1>
      <h4>Price: {ticket.price}</h4>
      {errors}
      <button onClick={() => {
        sendRequest({
          url: '/api/orders',
          method: 'post',
          body: {
            ticketId: ticket.id,
          },
          onSuccess: (order) => console.log(order),
        })
      }} className="btn btn-primary">
        Purchase
      </button>
    </div>
  );
};

TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;

  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data.ticket };
};

export default TicketShow;
