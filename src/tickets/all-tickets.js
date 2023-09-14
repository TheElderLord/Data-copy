const xml2js = require("xml2js");
const axios = require("axios");

const { all_ticket } = require("../constants");

// const server_sorting = require("../server/server-sorting");

async function fetchTickets(online) { //fethes all tickets from all servers, returns array of objects,each object are tickets from one server
  console.log("Fetch tickets started");
  const tickets = [];
  // const { online } = await server_sorting();
  await Promise.all(online.map(async (element) => {
    // console.log(element);
    if (element === undefined || element === null) {
      return;
    }
    const url = `http://${element.F_IP_ADDRESS}:3856`;

    try {
      const soapResponse = await axios.post(url, all_ticket, {
        headers: {
          "Content-Type": "text/xml",
        },
      });
      const xml = soapResponse.data;

      const parseOptions = {
        explicitArray: false,
        explicitCharkey: true,
        trim: true,
        attrkey: "@",
        charkey: "#",
      };

      xml2js.parseString(xml, parseOptions, (err, result) => {
        if (err) {
          console.error("Error parsing XML:", err);
          reject(err);
          return;
        }

        const fullTicketElements =
          result["soapenv:Envelope"]["soapenv:Body"]["cus:NomadAllTicketList"][
            "xsd:complexType"
          ][1]["xsd:element"];
         
        if(!fullTicketElements){
          return;
        }
          // console.log('Tickets',fullTicketElements);
        if (Array.isArray(fullTicketElements)) {
          const extractedTickets = fullTicketElements.map(
            (element) => element["@"]
            
          );
          tickets.push(extractedTickets);
          // console.log('Tickets:', extractedTickets);
          // resolve(extractedTickets);
        } else {
          const singleTicket = fullTicketElements["@"];
          tickets.push(singleTicket);
          // console.log('Ticket:', singleTicket["@"]["EventId"]);
          // resolve(singleTicket);
        }
        
      });
    } catch (error) {
      console.error("Error fetching and inserting data:", error);
      throw error;
    }
  }));
  
  return tickets;
}

module.exports = fetchTickets;
