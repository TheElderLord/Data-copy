// const server_sorting = require("../server/server-sorting");

// const all_tickets = require("./all-tickets");
const event_confirm = require("./event-confirm");

const confirmTickets = async (online, tickets) => {
  console.log("Confirm tickets started");
  // const {online} = await server_sorting();
  // const tickets = await all_tickets();
  online.forEach((server) => {
    try {
      console.log(server);
      tickets.forEach((ticket) => {
        ticket.forEach((element) => {
          if (element.IdBranch == server.f_id && element.State == "COMPLETED") {
            event_confirm(server.f_ip_address, element.EventId);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = confirmTickets;
