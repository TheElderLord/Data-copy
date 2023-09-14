"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _bluebird = require("bluebird");
var _ref;
var nomadConnection = require("../database/NomadDB");
var createConnectionPool = require("../database/SitDB");
var nomadpool = nomadConnection();
var sitpool = createConnectionPool();

//id, F_ID, F_NAME, F_WORK_NAME, F_ID_PARENT, F_F_2, F_QWAIT_TIME, F_MAX_SERV_TIME
var fetch_services = function fetch_services() {
  return (_ref = _ref || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var _ref2, sql, _yield$nomadpool$exec, _yield$nomadpool$exec2, rows;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          console.log("Fetching services");
          sql = "SELECT * FROM  t_g_queue";
          _context2.next = 5;
          return nomadpool.execute(sql);
        case 5:
          _yield$nomadpool$exec = _context2.sent;
          _yield$nomadpool$exec2 = (0, _slicedToArray2["default"])(_yield$nomadpool$exec, 1);
          rows = _yield$nomadpool$exec2[0];
          // console.log(rows[1].F_NAME);
          // console.log(rows[1].F_WORK_NAME);
          // console.log(rows[1].F_ID_PARENT);
          // console.log(rows[1].F_F_2);
          // console.log(rows[1].F_QWAIT_TIME);
          // console.log(rows[1].F_MAX_SERV_TIME);
          rows.forEach(function (_x) {
            return (_ref2 = _ref2 || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee(element) {
              var updateSql, result, insert, values, insertResult;
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    element.F_NAME = element.F_NAME.replace("RU=", "");
                    updateSql = "UPDATE services_list SET F_NAME = ?, F_WORK_NAME = ?, F_ID_PARENT = ?, F_F_2 = ?, F_QWAIT_TIME = ?, F_MAX_SERV_TIME = ? WHERE F_ID = ?";
                    _context.next = 4;
                    return sitpool.query(updateSql, [element.F_NAME, element.F_WORK_NAME, element.F_ID_PARENT, element.F_F_2, element.F_QWAIT_TIME, element.F_MAX_SERV_TIME, element.F_ID]);
                  case 4:
                    result = _context.sent;
                    if (!(result[0].affectedRows === 1)) {
                      _context.next = 9;
                      break;
                    }
                    console.log("Updated ".concat(element.F_NAME));
                    _context.next = 14;
                    break;
                  case 9:
                    insert = "INSERT INTO services_list ( F_ID, F_NAME, F_WORK_NAME, F_ID_PARENT, F_F_2, F_QWAIT_TIME, F_MAX_SERV_TIME) VALUES ?";
                    values = [[element.F_ID, element.F_NAME, element.F_WORK_NAME, element.F_ID_PARENT, element.F_F_2, element.F_QWAIT_TIME, element.F_MAX_SERV_TIME]];
                    _context.next = 13;
                    return sitpool.query(insert, [values]);
                  case 13:
                    insertResult = _context.sent;
                  case 14:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }))).apply(this, arguments);
          });
          _context2.next = 14;
          break;
        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 11]]);
  }))).apply(this, arguments);
};
module.exports = fetch_services;