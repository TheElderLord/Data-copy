
const insertOnlineServers = require("./server-insertion");
const server_send = require("./server-sender");

const all_server_fetcher = require("./all-server-fetcher");
const server_sort = require("./server-sorting");
const user_fetch = require("../users/user-fetcher");

//mailer
const mailer = require("../mail/mailer");

//Sit Center database
const createConnectionPool= require("../database/SitDB");
const pool = createConnectionPool();
//Nomad database
const nomadConnection = require("../database/NomadDB");
const nomadpool = nomadConnection();

const serverController = async (users) => {
    
    console.log('Server controller started');
    try {
        // const users = await user_fetch();
        const servers = await all_server_fetcher(nomadpool);
        let {online,offline} = await server_sort(servers);
        // const sortingId = setInterval(async()=>{
        //     ({online,offline} = await server_sort(servers));
        // }, 5000);
        
        await insertOnlineServers(online,offline,pool);
        // const insertId = setInterval(async()=>{
        //     await insertOnlineServers(online,offline,pool);
        // }, 5000);

        // clearInterval(insertId);
        // clearInterval(sortingId);

        //how to block send function until insertOnlineServers is finished
    //     if(onn) {
    //     console.log('Insertion finished')
    //     await send(offline,users,pool,mailer);
    // }
       

    } catch (error) {
        console.error('Error:', error);
    }
    
 }
 const send = async (offline,users,pool,mailer) => {
    
    try {
        await server_send(offline,users,pool,mailer);
    }
    catch (error) {
        console.error('Error:', error);
    }
    }
       


 module.exports = serverController;