"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _bluebird = require("bluebird");
var _ref;
var fetchOperator = require('./all-operator');
// const createConnectionPool = require("../database/SitDB");
// const pool = createConnectionPool();
var operatorInsertion = require('./operatorInsertion');
var operatorController = function operatorController(_x, _x2) {
  return (_ref = _ref || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee(online, pool) {
    var operators;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log('Operator Controller');
          _context.next = 4;
          return fetchOperator(online);
        case 4:
          operators = _context.sent;
          console.log('Operators', operators.length);
          _context.next = 8;
          return operatorInsertion(operators, pool);
        case 8:
          _context.next = 13;
          break;
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 10]]);
  }))).apply(this, arguments);
};
module.exports = operatorController;