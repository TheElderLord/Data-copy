// const createConnectionPool = require("../database/SitDB");
// const server_sort = require("./server-sorting");

// const pool = createConnectionPool();

async function insertOnlineServers(online, offline, pool) {
  console.log("Insert  servers started");
  //   try {
  // const { online, offline } = await server_sort();
  // console.log('Online',online);
  // console.log(offline);

  online.foreach(async (element) => {
    try {
      if (element === undefined || element === null) {
        return;
      }
      const sql = `SELECT * FROM branches WHERE F_ID = '${element.f_id}'`;
      const result = await pool.query(sql);
      // how to get element

      //   console.log(result);
      if (result[0].length === 0) {
        const insertQuery = `INSERT INTO branches (F_IP_ADDRESS, F_NAME, F_ID, F_PARENT_ID, ONN) VALUES ('${element.f_ip_address}', '${element.F_NAME}', '${element.f_id}', '${element.F_PARENT_ID}', 1)`;
        await pool.query(insertQuery);
        console.log("New online server inserted");
        return;
      } else {
        if (result[0][0].ONN === 1) {
          console.log("Server is already online");
          return;
        }
        const updateQuery = `UPDATE branches SET  ONN = 1, F_IP_ADDRESS = ${element.f_ip_address} WHERE F_ID = '${element.f_id}'`;
        await pool.query(updateQuery);
        console.log("Offline server is available now");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  });

  offline.foreach(async (element) => {
    try {
    if (element === undefined || element === null) {
      return;
    }
    const sql = `SELECT * FROM branches WHERE F_ID = '${element.f_id}'`;
    const result = await pool.query(sql);
    // console.log(result[0][0].ONN);
    if (result[0].length === 0) {
      const insertQuery = `INSERT INTO branches (F_IP_ADDRESS, F_NAME, F_ID, F_PARENT_ID, ONN) VALUES ('${element.f_ip_address}', '${element.F_NAME}', '${element.f_id}', '${element.F_PARENT_ID}', 0)`;
      await pool.query(insertQuery);
      console.log("Inserted offline server");
      // console.log(insertResult);
      return;
    } else {
      if (result[0][0].ONN === 0) {
        console.log("Server is already offline");
        return;
      }
      const updateQuery = `UPDATE branches SET  ONN = 0 WHERE F_IP_ADDRESS = '${element.f_id}'`;
      await pool.query(updateQuery);
      console.log("Online server is now offline");
      return;
    }
    } catch (error) {
      console.log(error);
    }
  });
  return true;
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
}

module.exports = insertOnlineServers;
