const axios = require("axios");
const xml2js = require("xml2js");

const { total_ticket } = require("../constants");

async function compareAndDelete(online, sitpool) {
  await Promise.all(
    online.map(async (element) => {
      // console.log(element);
      if (element === undefined || element === null) {
        return;
      }
      const url = `http://${element.F_IP_ADDRESS}:3856`;

      try {
        const soapResponse = await axios.post(url, total_ticket, {
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
            result["soapenv:Envelope"]["soapenv:Body"][
              "cus:NomadAllTicketList"
            ]["xsd:complexType"][1]["xsd:element"];

          if (!fullTicketElements) {
            return;
          }
          fullTicketElements.map(async (el) => {
            const ticket = el["@"]["EventId"];
            const sql = `SELECT eventid FROM facts WHERE eventid = '${ticket}' and idbranch = ${element.f_id}`;
            const result = await sitpool.query(sql);
            if (result[0].length === 0) {
              const deleteQuery = `DELETE FROM tickets WHERE eventid = '${ticket}'`;
              await sitpool.query(deleteQuery);
              console.log("Deleted ticket");
              return;
            }
          });
        });
      } catch (error) {
        console.error("Error fetching and inserting data:", error);
        throw error;
      }
    })
  );
}

module.exports = compareAndDelete;
