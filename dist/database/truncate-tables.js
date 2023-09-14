"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _bluebird = require("bluebird");
var _ref;
var createConnectionPool = require("./SitDB");
var pool = createConnectionPool();
var truncateTables = function truncateTables() {
  return (_ref = _ref || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var truncate, truncate2, truncate4, truncate5, truncate6;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          truncate = "TRUNCATE TABLE branches";
          _context.next = 4;
          return pool.query(truncate);
        case 4:
          console.log('Branches table is truncated');
          truncate2 = "TRUNCATE TABLE facts";
          _context.next = 8;
          return pool.query(truncate2);
        case 8:
          console.log('Facts table is truncated');
          truncate4 = "TRUNCATE TABLE window_state";
          _context.next = 12;
          return pool.query(truncate4);
        case 12:
          console.log('Windows table is truncated');
          truncate5 = "TRUNCATE TABLE employee_list";
          _context.next = 16;
          return pool.query(truncate5);
        case 16:
          console.log('Operators table is truncated');
          truncate6 = "TRUNCATE TABLE services_list";
          _context.next = 20;
          return pool.query(truncate6);
        case 20:
          console.log('Services table is truncated');
          _context.next = 26;
          break;
        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
        case 26:
          return _context.abrupt("return", true);
        case 27:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 23]]);
  }))).apply(this, arguments);
};
module.exports = truncateTables;