"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _bluebird = require("bluebird");
var _ref;
// const createConnectionPool = require("../SitDB");
// const pool = createConnectionPool();

var server_sorting = require("../server/server-sorting");
var ticket_insertion = require("./ticket-insertion");
var sendTickets = require("./ticket-sender");
var mail = require("../mail/mailer");
var ticket_confirm = require("./ticket-confirm");
var all_tickets = require("./all-tickets");
var fetch_user = require("../users/user-fetcher");
var ticket_sorting = require("./ticket-sorting");
var compareAndDelete = require("./compareAndDelete");
var ticketController = function ticketController(_x, _x2, _x3) {
  return (_ref = _ref || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee(online, pool, users) {
    var tickets, warning;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return all_tickets(online);
        case 3:
          tickets = _context.sent;
          _context.next = 6;
          return ticket_insertion(tickets, pool);
        case 6:
          _context.next = 8;
          return ticket_sorting(tickets);
        case 8:
          warning = _context.sent;
          console.log(warning);
          _context.next = 12;
          return sendTickets(users, warning, mail);
        case 12:
          _context.next = 14;
          return ticket_confirm(online, tickets);
        case 14:
          _context.next = 16;
          return compareAndDelete(online, pool);
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
};
module.exports = ticketController;