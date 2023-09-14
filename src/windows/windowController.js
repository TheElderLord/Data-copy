const window_list = require('./windowsList');
// const createConnectionPool = require("../database/SitDB");
// const pool = createConnectionPool();

const windowsInsertion = require('./windowsInsertion');

const windowControler = async (online,pool) => {
    try{
    console.log('Windows Controller...');
    const windows = await window_list(online);
    console.log('Windows length',windows.length);
    await windowsInsertion(windows,pool);
    } catch (error) {
        console.log(error);
    }

    
    // setInterval(async()=>{
    // const windows = await window_list(online);
    // await windowsInsertion(windows,pool);
    // }, 5000);
}
module.exports = windowControler;
