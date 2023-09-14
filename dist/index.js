"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _bluebird = require("bluebird");
var _ref;
var fetchService = require("./services/service-fetch");
var fetchUsers = require("./users/user-fetcher");
var serverController = require("./server/serverController");
var truncateTables = require("./database/truncate-tables");
var operatorController = require("./operators/operatorController");
var windowControler = require("./windows/windowController");
var ticketController = require("./tickets/ticketController");
var createConnectionPool = require("./database/SitDB");
var pool = createConnectionPool();
var getOnlineServers = require("./server/getOnlineServers");
var dotenv = require("dotenv");
dotenv.config();
var main = function main() {
  return (_ref = _ref || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    var users, server_update, ticket_update, operator_update, window_update, online;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return truncateTables();
        case 2:
          _context6.next = 4;
          return fetchUsers();
        case 4:
          users = _context6.sent;
          console.log(users);
          _context6.next = 8;
          return fetchService();
        case 8:
          server_update = process.env.SERVER_UPDATE;
          ticket_update = process.env.TICKET_UPDATE;
          operator_update = process.env.OPERATOR_UPDATE;
          window_update = process.env.WINDOW_UPDATE;
          console.log(server_update, ticket_update, operator_update, window_update);
          setInterval( /*#__PURE__*/(0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
            return _regenerator["default"].wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return serverController(users);
                case 2:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          })), server_update);
          _context6.next = 16;
          return getOnlineServers(pool);
        case 16:
          online = _context6.sent;
          setInterval( /*#__PURE__*/(0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
            return _regenerator["default"].wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return getOnlineServers(pool);
                case 2:
                  online = _context2.sent;
                case 3:
                case "end":
                  return _context2.stop();
              }
            }, _callee2);
          })), server_update + 5000);
          setInterval( /*#__PURE__*/(0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
            return _regenerator["default"].wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return operatorController(online, pool);
                case 2:
                case "end":
                  return _context3.stop();
              }
            }, _callee3);
          })), operator_update);
          setInterval( /*#__PURE__*/(0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
            return _regenerator["default"].wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return windowControler(online, pool);
                case 2:
                case "end":
                  return _context4.stop();
              }
            }, _callee4);
          })), window_update);
          setInterval( /*#__PURE__*/(0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
            return _regenerator["default"].wrap(function _callee5$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return ticketController(online, pool, users);
                case 2:
                case "end":
                  return _context5.stop();
              }
            }, _callee5);
          })), ticket_update);
        case 21:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }))).apply(this, arguments);
};
main();

// (async () => {
//   const users = await fetchUsers();
//   const online = await getOnlineServers(pool);
//   await ticketController(online, pool, users);
// })();