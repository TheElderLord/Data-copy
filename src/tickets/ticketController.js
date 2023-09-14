// const createConnectionPool = require("../SitDB");
// const pool = createConnectionPool();

const server_sorting = require("../server/server-sorting");
const ticket_insertion = require("./ticket-insertion");
const sendTickets = require("./ticket-sender");
const mail = require("../mail/mailer");
const ticket_confirm = require("./ticket-confirm");


const all_tickets = require("./all-tickets");
const fetch_user = require("../users/user-fetcher");
const ticket_sorting = require("./ticket-sorting");

const compareAndDelete = require("./compareAndDelete");

const ticketController = async (online,pool,users) => {
    try {
    // const users = await fetch_user();
    // const {online} = await server_sorting();
    const tickets = await all_tickets(online);
    // console.log(tickets);


    await ticket_insertion(tickets,pool);
    const warning = await ticket_sorting(tickets);
    console.log(warning);
    await sendTickets(users,warning,mail);
    await ticket_confirm(online,tickets);
    await compareAndDelete(online,pool);
    } catch (error) {
        console.log(error);
    }



};
module.exports = ticketController;
