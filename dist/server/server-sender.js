"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _bluebird = require("bluebird");
var _ref;
// const mailer = require("../mail/mailer");
// const fetch_user = require("../users/user-fetcher");
// const server_sorting = require("./server-sorting");
// const createConnectionPool = require("../database/SitDB");

// const pool = createConnectionPool();

var server_send = function server_send(_x, _x2, _x3, _x4) {
  return (_ref = _ref || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee3(offline, users, pool, mailer) {
    var _ref2;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          console.log("Server send started");
          // const users = await fetch_user();
          // const {offline} = await server_sorting();

          users.forEach(function (_x5) {
            return (_ref2 = _ref2 || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee2(element) {
              var _ref3;
              return _regenerator["default"].wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    offline.forEach(function (_x6) {
                      return (_ref3 = _ref3 || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee(server) {
                        var select, result, update;
                        return _regenerator["default"].wrap(function _callee$(_context) {
                          while (1) switch (_context.prev = _context.next) {
                            case 0:
                              _context.prev = 0;
                              // console.log(element.id_branch);
                              // console.log(server.f_id);
                              select = "SELECT * FROM branches WHERE F_ID = ?";
                              _context.next = 4;
                              return pool.query(select, [server.f_id]);
                            case 4:
                              result = _context.sent;
                              console.log(result);
                              // console.log(result[0][0].send_n);
                              if (!(result[0][0].send_n === 0)) {
                                _context.next = 16;
                                break;
                              }
                              if (element.id_branch) {
                                _context.next = 9;
                                break;
                              }
                              return _context.abrupt("return");
                            case 9:
                              if (!element.id_branch.includes(server.f_id)) {
                                _context.next = 16;
                                break;
                              }
                              if (element.email) {
                                _context.next = 12;
                                break;
                              }
                              return _context.abrupt("return");
                            case 12:
                              mailer("Server ".concat(server.F_NAME, " is offline"), [element.email]);
                              update = "UPDATE branches SET send_n = 1 WHERE F_ID = ?";
                              _context.next = 16;
                              return pool.query(update, [server.f_id]);
                            case 16:
                              _context.next = 21;
                              break;
                            case 18:
                              _context.prev = 18;
                              _context.t0 = _context["catch"](0);
                              console.log(_context.t0);
                            case 21:
                            case "end":
                              return _context.stop();
                          }
                        }, _callee, null, [[0, 18]]);
                      }))).apply(this, arguments);
                    });
                  case 1:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }))).apply(this, arguments);
          });
        case 2:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }))).apply(this, arguments);
};
module.exports = server_send;