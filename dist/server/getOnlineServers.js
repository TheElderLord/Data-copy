"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _bluebird = require("bluebird");
var _ref;
var getOnlineServers = function getOnlineServers(_x) {
  return (_ref = _ref || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee(pool) {
    var query, result, onlineServers;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          query = 'SELECT * FROM branches WHERE ONN = 1';
          _context.next = 4;
          return pool.query(query);
        case 4:
          result = _context.sent;
          onlineServers = result[0];
          return _context.abrupt("return", onlineServers);
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }))).apply(this, arguments);
};
module.exports = getOnlineServers;