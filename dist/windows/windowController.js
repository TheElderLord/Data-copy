"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _bluebird = require("bluebird");
var _ref;
var window_list = require('./windowsList');
// const createConnectionPool = require("../database/SitDB");
// const pool = createConnectionPool();

var windowsInsertion = require('./windowsInsertion');
var windowControler = function windowControler(_x, _x2) {
  return (_ref = _ref || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee(online, pool) {
    var windows;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log('Windows Controller...');
          _context.next = 4;
          return window_list(online);
        case 4:
          windows = _context.sent;
          console.log('Windows length', windows.length);
          _context.next = 8;
          return windowsInsertion(windows, pool);
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
module.exports = windowControler;