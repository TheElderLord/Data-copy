"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _bluebird = require("bluebird");
var _confirmation;
var axios = require("axios");
var _require = require("../constants"),
  event_confirm = _require.event_confirm;
function confirmation(_x, _x2) {
  return (_confirmation = _confirmation || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee(ip, eventId) {
    var url, replacedReq, soapResponse;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log("Confirmation started");
          url = "http://".concat(ip, ":3856");
          replacedReq = event_confirm.replace('?', eventId);
          _context.prev = 3;
          _context.next = 6;
          return axios.post(url, replacedReq, {
            headers: {
              "Content-Type": "text/xml"
            }
          });
        case 6:
          soapResponse = _context.sent;
          _context.next = 12;
          break;
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](3);
          console.error("Error fetching and inserting data:", _context.t0);
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 9]]);
  }))).apply(this, arguments);
}
module.exports = confirmation;