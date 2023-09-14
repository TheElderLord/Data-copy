const createConnectionPool = require("./SitDB");

const pool = createConnectionPool();

const truncateTables = async () => {
    try{
    const truncate = `TRUNCATE TABLE branches`;
    await pool.query(truncate);
    console.log('Branches table is truncated');
    

    const truncate2 = `TRUNCATE TABLE facts`;
    await pool.query(truncate2);
    console.log('Facts table is truncated');
    

    
    
    const truncate4 = `TRUNCATE TABLE window_state`;
    await pool.query(truncate4);
    console.log('Windows table is truncated');


    const truncate5 = `TRUNCATE TABLE employee_list`;
    await pool.query(truncate5);
    console.log('Operators table is truncated');


    
    const truncate6 = `TRUNCATE TABLE services_list`;
    await pool.query(truncate6);
    console.log('Services table is truncated');
    } catch (err) {
        console.log(err);
    }
    
    return true;
}

module.exports = truncateTables;