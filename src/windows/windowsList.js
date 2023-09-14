const xml2js = require("xml2js");
const axios = require("axios");

const {  window_list } = require("../constants");

async function fetchWindows(online) {
  console.log('Fetching windows...');
  // const {online} = await server_sorting();
  const windowList = [];
  await Promise.all(online.map(async (element) => {
    // console.log(element.F_IP_ADDRESS);

    const url = `http://${element.F_IP_ADDRESS}:3856`;
  try {
    const soapResponse = await axios.post(url, window_list, {
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
          console.error("Error parsing XML:");
          reject(err);
          return;
        }

        const windows =
          result["soapenv:Envelope"]["soapenv:Body"]["cus:NomadWindowList"]["xsd:complexType"][1]["xsd:element"];

        const extractedWindows = windows.map(element => element["@"]);
        // console.log('Windows:', extractedWindows);
        windowList.push(extractedWindows);
      });
    

  } catch (error) {
    console.error("Error fetching and inserting data:");
    // throw error;
  }
}));
return windowList;
}

module.exports = fetchWindows;
