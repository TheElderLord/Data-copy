// const fetch_ticket = require("./all-tickets");

const sortByState = async (tickets) => {
  console.log("Sort by state started");
  // const tickets = await fetch_ticket();
  const warning = [];

  // console.log(tickets);
  tickets.forEach(async (element) => {
    try {
      element.forEach(async (element) => {
        if (
          element.ServOver == "true" ||
          element.WaitOver == "true" ||
          element.Rating == "1" ||
          element.Rating == "2"
        ) {
          warning.push(element);
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
  return warning;
};
module.exports = sortByState;
