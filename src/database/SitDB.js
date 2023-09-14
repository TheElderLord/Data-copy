const mysql = require('mysql2/promise');
const path = require('path');
const { sit_host, sit_user, sit_password, sit_database, sit_port } = require('../constants');

const dbConfig = {
    host: sit_host,
    user: sit_user,
    password: sit_password,
    database: sit_database,
    port: sit_port,
};

const createConnectionPool = () => {
    return mysql.createPool(dbConfig);
};

module.exports = createConnectionPool;
