"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _bluebird = require("bluebird");
var _ref;
// const server_sorting = require("../server/server-sorting");

// const all_tickets = require("./all-tickets");
var event_confirm = require("./event-confirm");
var confirmTickets = function confirmTickets(_x, _x2) {
  return (_ref = _ref || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee(online, tickets) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log("Confirm tickets started");
          // const {online} = await server_sorting();
          // const tickets = await all_tickets();
          online.forEach(function (server) {
            try {
              console.log(server);
              tickets.forEach(function (ticket) {
                ticket.forEach(function (element) {
                  if (element.IdBranch == server.f_id && element.State == "COMPLETED") {
                    event_confirm(server.f_ip_address, element.EventId);
                  }
                });
              });
            } catch (error) {
              console.log(error);
            }
          });
        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }))).apply(this, arguments);
};
module.exports = confirmTickets;