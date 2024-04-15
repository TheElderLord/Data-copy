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
  console.log(`Main function started at ${new Date().toLocaleString()}`);
  await truncateTables();
  const users = await fetchUsers();
  // console.log(users);
  await fetchService();


  const server_update = process.env.SERVER_UPDATE;
  const ticket_update = process.env.TICKET_UPDATE;
  const operator_update = process.env.OPERATOR_UPDATE;
  const window_update = process.env.WINDOW_UPDATE;
  console.log(server_update, ticket_update, operator_update, window_update);  
  await serverController(users);    
  // setInterval(async () => {
  //   await serverController(users);
  // }, server_update);

  let online = await getOnlineServers(pool);
  // setInterval(async () => {
  //   online = await getOnlineServers(pool);
  // }, server_update + 5000);

  await operatorController(online, pool);
  // setInterval(async () => {
  //   await operatorController(online, pool);
  // }, operator_update);
  await windowControler(online, pool);
  // setInterval(async () => {
  //   await windowControler(online, pool);
  // }, window_update);
  await ticketController(online, pool, users);
  // setInterval(async () => {
  //   await ticketController(online, pool, users);
  // }, ticket_update);
};

const startMainAtCustomTime = () => {
  const restartTime = process.env.RESTART_TIME || '09:00'; // Default restart time is 09:00
  const [hours, minutes] = restartTime.split(':').map(Number);
  const now = new Date();
  let restartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0, 0);
  if (restartDate <= now) {
    restartDate.setDate(restartDate.getDate() + 1); // If restart time has already passed for today, schedule it for tomorrow
  }
  const millisecondsUntilRestart = restartDate - now;
  setTimeout(() => {
    main();
    setInterval(main, 24 * 60 * 60 * 1000);
  }, millisecondsUntilRestart);
};

// Start the main function immediately
main();
// Schedule the main function to restart at the specified time
// startMainAtCustomTime();
