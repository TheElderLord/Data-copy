"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _bluebird = require("bluebird");
var _ref, _ref2;
var insertOnlineServers = require("./server-insertion");
var server_send = require("./server-sender");
var all_server_fetcher = require("./all-server-fetcher");
var server_sort = require("./server-sorting");
var user_fetch = require("../users/user-fetcher");

//mailer
var mailer = require("../mail/mailer");

//Sit Center database
var createConnectionPool = require("../database/SitDB");
var pool = createConnectionPool();
//Nomad database
var nomadConnection = require("../database/NomadDB");
var nomadpool = nomadConnection();
var serverController = function serverController(_x) {
  return (_ref = _ref || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee(users) {
    var servers, _yield$server_sort, online, offline;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log('Server controller started');
          _context.prev = 1;
          _context.next = 4;
          return all_server_fetcher(nomadpool);
        case 4:
          servers = _context.sent;
          _context.next = 7;
          return server_sort(servers);
        case 7:
          _yield$server_sort = _context.sent;
          online = _yield$server_sort.online;
          offline = _yield$server_sort.offline;
          _context.next = 12;
          return insertOnlineServers(online, offline, pool);
        case 12:
          _context.next = 17;
          break;
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](1);
          console.error('Error:', _context.t0);
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 14]]);
  }))).apply(this, arguments);
};
var send = function send(_x2, _x3, _x4, _x5) {
  return (_ref2 = _ref2 || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee2(offline, users, pool, mailer) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return server_send(offline, users, pool, mailer);
        case 3:
          _context2.next = 8;
          break;
        case 5:
          _context2.prev = 5;
          _context2.t0 = _context2["catch"](0);
          console.error('Error:', _context2.t0);
        case 8:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 5]]);
  }))).apply(this, arguments);
};
module.exports = serverController;