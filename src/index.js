const fetchService = require("./services/service-fetch");
const fetchUsers = require("./users/user-fetcher");

const serverController = require("./server/serverController");

const truncateTables = require("./database/truncate-tables");

const operatorController = require("./operators/operatorController");
const windowControler = require("./windows/windowController");

const ticketController = require("./tickets/ticketController");

const createConnectionPool = require("./database/SitDB");
const pool = createConnectionPool();
const getOnlineServers = require("./server/getOnlineServers");

const dotenv = require("dotenv");
dotenv.config();

const main = async () => {
  await truncateTables();
  const users = await fetchUsers();
  console.log(users);
  await fetchService();


  const server_update = process.env.SERVER_UPDATE;
  const ticket_update = process.env.TICKET_UPDATE;
  const operator_update = process.env.OPERATOR_UPDATE;
  const window_update = process.env.WINDOW_UPDATE;
  console.log(server_update, ticket_update, operator_update, window_update);
  setInterval(async () => {
    await serverController(users);
  }, server_update);

  let online = await getOnlineServers(pool);
  setInterval(async () => {
    online = await getOnlineServers(pool);
  }, server_update + 5000);

  setInterval(async () => {
    await operatorController(online, pool);
  }, operator_update);
  setInterval(async () => {
    await windowControler(online, pool);
  }, window_update);
  setInterval(async () => {
    await ticketController(online, pool, users);
  }, ticket_update);
};

main();

// (async () => {
//   const users = await fetchUsers();
//   const online = await getOnlineServers(pool);
//   await ticketController(online, pool, users);
// })();
