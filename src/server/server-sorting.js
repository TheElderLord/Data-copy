// const server_fetch = require('./all-server-fetcher');
const { all_operator } = require("../constants");
const axios = require("axios");

const axiosInstance = axios.create({
    timeout: 2000 
});

async function server_sort(servers) {
    console.log('Server sorting started');
    // const servers = await server_fetch();
    const online = [];
    const offline = [];
    // servers.map((server) => {
    //     console.log(server);
    // })
    await Promise.all(servers.map(async (server) => {
        try {
            const ip = server.f_ip_address;
            const url = `http://${ip}:3856`;
            const response = await axiosInstance.post(url, all_operator);
            if (response.status === 200) {
                // console.log('Online:', server.f_ip_address)
                online.push(server);
            }
            else {
                // console.log('Offline:', server.f_ip_address)
                offline.push(server);
               
            }
        } catch (error) {
            // console.error(`Error connecting to ${url}:`, error.message);
            // console.log('Offline:', server.f_ip_address)
            offline.push(server);
        }
    }));
    
    return {online, offline};
}

module.exports = server_sort;
