const mysql = require('mysql2/promise');


const {nomad_host, nomad_user, nomad_password, nomad_database, nomad_port} = require('../constants');


const dbConfig = {
    host: nomad_host,
    user: nomad_user,
    password: nomad_password,
    database: nomad_database,
    port: nomad_port,
  };
  
  const nomadConnection = () => {
    return mysql.createPool(dbConfig);
  };

module.exports = nomadConnection;
