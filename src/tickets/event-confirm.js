
const axios = require("axios");

const {  event_confirm } = require("../constants");



async function confirmation(ip,eventId) {
    console.log("Confirmation started");
    const url = `http://${ip}:3856`;
    const replacedReq = event_confirm.replace('?',eventId);

    try {
      const soapResponse = await axios.post(url, replacedReq, {
        headers: {
          "Content-Type": "text/xml",
        },
      });
      // const xml = soapResponse.data;
      // console.log(xml);
    } catch (error) {
      console.error("Error fetching and inserting data:", error);
    }
  }

  module.exports = confirmation;