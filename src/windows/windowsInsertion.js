// const fetchWindows = require('./windowsList');
// const createConnectionPool = require("../database/SitDB");
// const pool = createConnectionPool();

//update+="idoperator=\'"+window.getIdoperator()+"\', worktitle=\'"+window.getWorkTitle() +"\' where windowid=" +
//"\'"+window.getWindowId()+"\';"

// String query ="INSERT INTO window_state SET ";
// query+= "windowid=\'"+window.getWindowId()+"\',winno=\'"+window.getWinno()+"\',idoperator=\'"+
// window.getIdoperator()+"\',"+
// "idbranch=\'"+window.getIdbranch()+"\',worktitle=\'"+window.getWorkTitle()+"\'";

//id, windowid, winno, idoperator, idbranch, worktitle
const windowsInsertion = async (windows, pool) => {
  console.log("Inserting windows...");
  // const windows = await fetchWindows();
  windows.forEach(async (win) => {
    win.forEach(async (element) => {
      try {
        const update =
          "UPDATE window_state SET winno = ?,idoperator = ?, idbranch = ?, worktitle = ? WHERE windowid = ?";
        const result = await pool.query(update, [
          element.No,
          element.OperatorId,
          element.BranchId,
          element.Role,
          element.WindowId,
        ]);
        if (result[0].affectedRows === 1) {
          console.log(`Updated ${element.role}`);
          return;
        } else {
          const insert =
            "INSERT INTO window_state (windowid, winno, idoperator, idbranch, worktitle) VALUES ?";
          const values = [
            [
              element.WindowId,
              element.No,
              element.OperatorId,
              element.BranchId,
              element.Role,
            ],
          ];
          const insertResult = await pool.query(insert, [values]);
          if (insertResult[0].affectedRows === 1) {
            console.log(`Inserted ${element.Role}`);
            return;
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
  });
};
module.exports = windowsInsertion;
