"use strict";

var mysql = require('mysql2/promise');
var _require = require('../constants'),
  nomad_host = _require.nomad_host,
  nomad_user = _require.nomad_user,
  nomad_password = _require.nomad_password,
  nomad_database = _require.nomad_database,
  nomad_port = _require.nomad_port;
var dbConfig = {
  host: nomad_host,
  user: nomad_user,
  password: nomad_password,
  database: nomad_database,
  port: nomad_port
};
var nomadConnection = function nomadConnection() {
  return mysql.createPool(dbConfig);
};
module.exports = nomadConnection;