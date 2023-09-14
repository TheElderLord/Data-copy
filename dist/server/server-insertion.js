"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _bluebird = require("bluebird");
var _insertOnlineServers;
// const createConnectionPool = require("../database/SitDB");
// const server_sort = require("./server-sorting");
// const pool = createConnectionPool();
function insertOnlineServers(_x, _x2, _x3) {
  return (_insertOnlineServers = _insertOnlineServers || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee3(online, offline, pool) {
    var _ref, _ref2;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          console.log("Insert  servers started");
          //   try {
          // const { online, offline } = await server_sort();
          // console.log('Online',online);
          // console.log(offline);

          online.foreach(function (_x4) {
            return (_ref = _ref || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee(element) {
              var sql, result, insertQuery, updateQuery;
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    if (!(element === undefined || element === null)) {
                      _context.next = 3;
                      break;
                    }
                    return _context.abrupt("return");
                  case 3:
                    sql = "SELECT * FROM branches WHERE F_ID = '".concat(element.f_id, "'");
                    _context.next = 6;
                    return pool.query(sql);
                  case 6:
                    result = _context.sent;
                    if (!(result[0].length === 0)) {
                      _context.next = 15;
                      break;
                    }
                    insertQuery = "INSERT INTO branches (F_IP_ADDRESS, F_NAME, F_ID, F_PARENT_ID, ONN) VALUES ('".concat(element.f_ip_address, "', '").concat(element.F_NAME, "', '").concat(element.f_id, "', '").concat(element.F_PARENT_ID, "', 1)");
                    _context.next = 11;
                    return pool.query(insertQuery);
                  case 11:
                    console.log("New online server inserted");
                    return _context.abrupt("return");
                  case 15:
                    if (!(result[0][0].ONN === 1)) {
                      _context.next = 18;
                      break;
                    }
                    console.log("Server is already online");
                    return _context.abrupt("return");
                  case 18:
                    updateQuery = "UPDATE branches SET  ONN = 1, F_IP_ADDRESS = ".concat(element.f_ip_address, " WHERE F_ID = '").concat(element.f_id, "'");
                    _context.next = 21;
                    return pool.query(updateQuery);
                  case 21:
                    console.log("Offline server is available now");
                    return _context.abrupt("return");
                  case 23:
                    _context.next = 28;
                    break;
                  case 25:
                    _context.prev = 25;
                    _context.t0 = _context["catch"](0);
                    console.log(_context.t0);
                  case 28:
                  case "end":
                    return _context.stop();
                }
              }, _callee, null, [[0, 25]]);
            }))).apply(this, arguments);
          });
          offline.foreach(function (_x5) {
            return (_ref2 = _ref2 || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee2(element) {
              var sql, result, insertQuery, updateQuery;
              return _regenerator["default"].wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.prev = 0;
                    if (!(element === undefined || element === null)) {
                      _context2.next = 3;
                      break;
                    }
                    return _context2.abrupt("return");
                  case 3:
                    sql = "SELECT * FROM branches WHERE F_ID = '".concat(element.f_id, "'");
                    _context2.next = 6;
                    return pool.query(sql);
                  case 6:
                    result = _context2.sent;
                    if (!(result[0].length === 0)) {
                      _context2.next = 15;
                      break;
                    }
                    insertQuery = "INSERT INTO branches (F_IP_ADDRESS, F_NAME, F_ID, F_PARENT_ID, ONN) VALUES ('".concat(element.f_ip_address, "', '").concat(element.F_NAME, "', '").concat(element.f_id, "', '").concat(element.F_PARENT_ID, "', 0)");
                    _context2.next = 11;
                    return pool.query(insertQuery);
                  case 11:
                    console.log("Inserted offline server");
                    // console.log(insertResult);
                    return _context2.abrupt("return");
                  case 15:
                    if (!(result[0][0].ONN === 0)) {
                      _context2.next = 18;
                      break;
                    }
                    console.log("Server is already offline");
                    return _context2.abrupt("return");
                  case 18:
                    updateQuery = "UPDATE branches SET  ONN = 0 WHERE F_IP_ADDRESS = '".concat(element.f_id, "'");
                    _context2.next = 21;
                    return pool.query(updateQuery);
                  case 21:
                    console.log("Online server is now offline");
                    return _context2.abrupt("return");
                  case 23:
                    _context2.next = 28;
                    break;
                  case 25:
                    _context2.prev = 25;
                    _context2.t0 = _context2["catch"](0);
                    console.log(_context2.t0);
                  case 28:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2, null, [[0, 25]]);
            }))).apply(this, arguments);
          });
          return _context3.abrupt("return", true);
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }))).apply(this, arguments);
}
module.exports = insertOnlineServers;