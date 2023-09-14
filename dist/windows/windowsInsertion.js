"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _bluebird = require("bluebird");
var _ref;
// const fetchWindows = require('./windowsList');
// const createConnectionPool = require("../database/SitDB");
// const pool = createConnectionPool();

//update+="idoperator=\'"+window.getIdoperator()+"\', worktitle=\'"+window.getWorkTitle() +"\' where windowid=" +
//"\'"+window.getWindowId()+"\';"

// String query ="INSERT INTO window_state SET ";
// query+= "windowid=\'"+window.getWindowId()+"\',winno=\'"+window.getWinno()+"\',idoperator=\'"+
// window.getIdoperator()+"\',"+
// "idbranch=\'"+window.getIdbranch()+"\',worktitle=\'"+window.getWorkTitle()+"\'";

//id, windowid, winno, idoperator, idbranch, worktitle
var windowsInsertion = function windowsInsertion(_x, _x2) {
  return (_ref = _ref || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee3(windows, pool) {
    var _ref2;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          console.log("Inserting windows...");
          // const windows = await fetchWindows();
          windows.forEach(function (_x3) {
            return (_ref2 = _ref2 || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee2(win) {
              var _ref3;
              return _regenerator["default"].wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    win.forEach(function (_x4) {
                      return (_ref3 = _ref3 || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee(element) {
                        var update, result, insert, values, insertResult;
                        return _regenerator["default"].wrap(function _callee$(_context) {
                          while (1) switch (_context.prev = _context.next) {
                            case 0:
                              _context.prev = 0;
                              update = "UPDATE window_state SET winno = ?,idoperator = ?, idbranch = ?, worktitle = ? WHERE windowid = ?";
                              _context.next = 4;
                              return pool.query(update, [element.No, element.OperatorId, element.BranchId, element.Role, element.WindowId]);
                            case 4:
                              result = _context.sent;
                              if (!(result[0].affectedRows === 1)) {
                                _context.next = 10;
                                break;
                              }
                              console.log("Updated ".concat(element.role));
                              return _context.abrupt("return");
                            case 10:
                              insert = "INSERT INTO window_state (windowid, winno, idoperator, idbranch, worktitle) VALUES ?";
                              values = [[element.WindowId, element.No, element.OperatorId, element.BranchId, element.Role]];
                              _context.next = 14;
                              return pool.query(insert, [values]);
                            case 14:
                              insertResult = _context.sent;
                              if (!(insertResult[0].affectedRows === 1)) {
                                _context.next = 18;
                                break;
                              }
                              console.log("Inserted ".concat(element.Role));
                              return _context.abrupt("return");
                            case 18:
                              _context.next = 23;
                              break;
                            case 20:
                              _context.prev = 20;
                              _context.t0 = _context["catch"](0);
                              console.log(_context.t0);
                            case 23:
                            case "end":
                              return _context.stop();
                          }
                        }, _callee, null, [[0, 20]]);
                      }))).apply(this, arguments);
                    });
                  case 1:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }))).apply(this, arguments);
          });
        case 2:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }))).apply(this, arguments);
};
module.exports = windowsInsertion;