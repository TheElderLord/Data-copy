

const getOnlineServers = async (pool) => {
    try {
    const query = 'SELECT * FROM branches WHERE ONN = 1';
    const result = await pool.query(query);
    const onlineServers = result[0];
    return onlineServers;
    } catch (error) {
        console.log(error);
    }
}
module.exports = getOnlineServers;