"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _bluebird = require("bluebird");
var _ref;
var createConnectionPool = require("../database/SitDB");
var pool = createConnectionPool();
var sql = 'Select id,login,id_branch,email from users';
var fetchUsers = function fetchUsers() {
  return (_ref = _ref || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var usersWithEmail, users;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          usersWithEmail = [];
          _context.prev = 1;
          console.log('Fetching users');
          _context.next = 5;
          return pool.query(sql);
        case 5:
          users = _context.sent;
          if (!(users[0].length === 0)) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return");
        case 8:
          users[0].forEach(function (element) {
            if (element.email) {
              usersWithEmail.push(element);
            }
          });
          _context.next = 14;
          break;
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);
        case 14:
          return _context.abrupt("return", usersWithEmail);
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 11]]);
  }))).apply(this, arguments);
};
module.exports = fetchUsers;