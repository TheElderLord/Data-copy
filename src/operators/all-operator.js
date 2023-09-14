const xml2js = require("xml2js");
const axios = require("axios");

const { all_operator } = require("../constants");
// const server_sorting = require("../server/server-sorting");

async function fetchOperator(online) {
  console.log("Fetching operators...");
  const operatorArray = [];
  // const {online} = await server_sorting();
  await Promise.all(
    online.map(async (element) => {
      try {
        const url = `http://${element.F_IP_ADDRESS}:3856`;
        const soapResponse = await axios.post(url, all_operator, {
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

          const ops =
            result["soapenv:Envelope"]["soapenv:Body"][
              "cus:NomadAllOperatorList"
            ]["xsd:complexType"][1]["xsd:element"];

          const operators = ops.map((element) => element["@"]);
          // console.log('Operators:', operators);
          operatorArray.push(operators);
        });
      } catch (error) {
        console.error("Error fetching and inserting data:", error);
        throw error;
      }
    })
  );
  return operatorArray;
}

module.exports = fetchOperator;
