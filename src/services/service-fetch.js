const nomadConnection = require("../database/NomadDB");
const createConnectionPool = require("../database/SitDB");

const nomadpool = nomadConnection();
const sitpool = createConnectionPool();

//id, F_ID, F_NAME, F_WORK_NAME, F_ID_PARENT, F_F_2, F_QWAIT_TIME, F_MAX_SERV_TIME
const fetch_services = async () => {
  try {
    console.log("Fetching services");
    const sql = `SELECT * FROM  t_g_queue`;
    const [rows] = await nomadpool.execute(sql);
    // console.log(rows[1].F_NAME);
    // console.log(rows[1].F_WORK_NAME);
    // console.log(rows[1].F_ID_PARENT);
    // console.log(rows[1].F_F_2);
    // console.log(rows[1].F_QWAIT_TIME);
    // console.log(rows[1].F_MAX_SERV_TIME);
    rows.forEach(async (element) => {
      element.F_NAME = element.F_NAME.replace("RU=", "");
      const updateSql =
        "UPDATE services_list SET F_NAME = ?, F_WORK_NAME = ?, F_ID_PARENT = ?, F_F_2 = ?, F_QWAIT_TIME = ?, F_MAX_SERV_TIME = ? WHERE F_ID = ?";
      const result = await sitpool.query(updateSql, [
        element.F_NAME,
        element.F_WORK_NAME,
        element.F_ID_PARENT,
        element.F_F_2,
        element.F_QWAIT_TIME,
        element.F_MAX_SERV_TIME,
        element.F_ID,
      ]);
      if (result[0].affectedRows === 1) {
        console.log(`Updated ${element.F_NAME}`);
      } else {
        const insert = `INSERT INTO services_list ( F_ID, F_NAME, F_WORK_NAME, F_ID_PARENT, F_F_2, F_QWAIT_TIME, F_MAX_SERV_TIME) VALUES ?`;
        const values = [
          [
            element.F_ID,
            element.F_NAME,
            element.F_WORK_NAME,
            element.F_ID_PARENT,
            element.F_F_2,
            element.F_QWAIT_TIME,
            element.F_MAX_SERV_TIME,
          ],
        ];
        const insertResult = await sitpool.query(insert, [values]);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = fetch_services;
