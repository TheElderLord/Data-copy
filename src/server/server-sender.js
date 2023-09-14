// const mailer = require("../mail/mailer");
// const fetch_user = require("../users/user-fetcher");
// const server_sorting = require("./server-sorting");
// const createConnectionPool = require("../database/SitDB");

// const pool = createConnectionPool();

const server_send = async (offline, users, pool, mailer) => {
  console.log("Server send started");
  // const users = await fetch_user();
  // const {offline} = await server_sorting();

  users.forEach(async (element) => {
    offline.forEach(async (server) => {
      try {
        // console.log(element.id_branch);
        // console.log(server.f_id);
        const select = "SELECT * FROM branches WHERE F_ID = ?";
        const result = await pool.query(select, [server.f_id]);
        console.log(result);
        // console.log(result[0][0].send_n);

        if (result[0][0].send_n === 0) {
          if (!element.id_branch) return;

          if (element.id_branch.includes(server.f_id)) {
            if (!element.email) return;
            mailer(`Server ${server.F_NAME} is offline`, [element.email]);
            const update = "UPDATE branches SET send_n = 1 WHERE F_ID = ?";
            await pool.query(update, [server.f_id]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
  });
};

module.exports = server_send;
