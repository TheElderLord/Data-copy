// // // String f_id=getStringFromXML(node,"operatorId").trim();
// // String f_work_name = getStringFromXML(node,"workName").trim();
// // String f_descr = getStringFromXML(node,"description");
// // String startTime = getStringFromXML(node,"startTime");
// // String f_branch_id = getStringFromXML(node,"branchId");

// // String update = "Update employee_list set ";
// // 			update+="startTime=\'"+operator.getStartTime()+"\',f_work_name=\'"+operator.getF_work_name()+"\' where f_id=\'"+operator.getF_id()+"\';";
// // //
// query+= "f_id=\'"+operator.getF_id()+"\',f_work_name=\'"+operator.getF_work_name()+"\',f_descr=\'"+operator.getF_descr()+"\',"+
// "startTime=\'"+operator.getStartTime()+"\',f_branch_id=\'"+operator.getF_branch_id()+"\'";
// //                System.out.println(query)

// const fetchOperator = require('./all-operator');
// const createConnectionPool = require("../database/SitDB");
// const pool = createConnectionPool();

const operatorInsertion = async (operators, pool) => {
  console.log("Inserting operators...");
  // const operators = await fetchOperator();
  //   console.log(operators);
  operators.forEach(async (op) => {
    op.forEach(async (operator) => {
      try{
      const update =
        "UPDATE employee_list SET f_work_name = ?,f_branch_id = ?, f_descr = ?, startTime = ? WHERE f_id = ?";
      const result = await pool.query(update, [
        operator.workName,
        operator.branchId,
        operator.description,
        operator.startTime,
        operator.operatorId,
      ]);
      // console.log(result);
      if (result[0].affectedRows === 1) {
        console.log("Operator Updated");
        return;
      } else {
        const insert =
          "INSERT INTO employee_list(f_id,f_work_name,f_branch_id,f_descr,startTime) VALUES(?,?,?,?,?)";
        const insertResult = await pool.query(insert, [
          operator.operatorId,
          operator.workName,
          operator.branchId,
          operator.description,
          operator.startTime,
        ]);
        if (insertResult.affectedRows === 1) {
          console.log("Operator Inserted");
          return;
        }
      }
      } catch (error) {
      console.log(error);
      }
    });
  });
};

module.exports = operatorInsertion;
