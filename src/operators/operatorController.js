const fetchOperator = require('./all-operator');
// const createConnectionPool = require("../database/SitDB");
// const pool = createConnectionPool();
const operatorInsertion = require('./operatorInsertion');

const operatorController = async (online,pool) => {
    try{
    console.log('Operator Controller')
    const operators = await fetchOperator(online);
    console.log('Operators',operators.length);
    await operatorInsertion(operators,pool);
    } catch (error) {
        console.log(error);
    }
    // setInterval(async()=>{
    //     const operators = await fetchOperator(online);
    //     await operatorInsertion(operators,pool);
    // }, 5000);

}

module.exports = operatorController;