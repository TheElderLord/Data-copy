"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _bluebird = require("bluebird");
var _ref;
// const user_fetcher = require('../users/user-fetcher');
// const ticket_sorting = require('./ticket-sorting');
// const mail = require('../mail/mailer');

var sendTickets = function sendTickets(_x, _x2, _x3, _x4) {
  return (_ref = _ref || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee3(users, warning, mail, pool) {
    var _ref2;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          // const warning = await ticket_sorting();
          // const users = await user_fetcher();
          warning.forEach(function (_x5) {
            return (_ref2 = _ref2 || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee2(element) {
              var _ref3;
              return _regenerator["default"].wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    try {
                      users.forEach(function (_x6) {
                        return (_ref3 = _ref3 || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee(user) {
                          var sql, _sql, _sql2;
                          return _regenerator["default"].wrap(function _callee$(_context) {
                            while (1) switch (_context.prev = _context.next) {
                              case 0:
                                if (!(user.id_branch === element.IdBranch)) {
                                  _context.next = 16;
                                  break;
                                }
                                if (!element.WaitOver) {
                                  _context.next = 6;
                                  break;
                                }
                                mail(user.email, "WaitOver", element);
                                sql = "UPDATE facts SET WaitSent = 1 WHERE eventid = ".concat(element.EventId);
                                _context.next = 6;
                                return pool.query(sql);
                              case 6:
                                if (!element.ServOver) {
                                  _context.next = 11;
                                  break;
                                }
                                mail(user.email, "ServOver", element);
                                _sql = "UPDATE facts SET ServSent = 1 WHERE eventid = ".concat(element.EventId);
                                _context.next = 11;
                                return pool.query(_sql);
                              case 11:
                                if (!(element.Rating == "1" || element.Rating == "2")) {
                                  _context.next = 16;
                                  break;
                                }
                                mail(user.email, "Bad rating", element);
                                _sql2 = "UPDATE facts SET RatingSent = 1 WHERE eventid = ".concat(element.EventId);
                                _context.next = 16;
                                return pool.query(_sql2);
                              case 16:
                              case "end":
                                return _context.stop();
                            }
                          }, _callee);
                        }))).apply(this, arguments);
                      });
                    } catch (error) {
                      console.log(error);
                    }
                  case 1:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }))).apply(this, arguments);
          });
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }))).apply(this, arguments);
};
module.exports = sendTickets;