"use strict";

var mysql = require('mysql2/promise');
var path = require('path');
var _require = require('../constants'),
  sit_host = _require.sit_host,
  sit_user = _require.sit_user,
  sit_password = _require.sit_password,
  sit_database = _require.sit_database,
  sit_port = _require.sit_port;
var dbConfig = {
  host: sit_host,
  user: sit_user,
  password: sit_password,
  database: sit_database,
  port: sit_port
};
var createConnectionPool = function createConnectionPool() {
  return mysql.createPool(dbConfig);
};
module.exports = createConnectionPool;