"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _bluebird = require("bluebird");
var _ref;
// // // String f_id=getStringFromXML(node,"operatorId").trim();
// // String f_work_name = getStringFromXML(node,"workName").trim();
// // String f_descr = getStringFromXML(node,"description");
// // String startTime = getStringFromXML(node,"startTime");
// // String f_branch_id = getStringFromXML(node,"branchId");

// // String update = "Update employee_list set ";
// // 			update+="startTime=\'"+operator.getStartTime()+"\',f_work_name=\'"+operator.getF_work_name()+"\' where f_id=\'"+operator.getF_id()+"\';";
// // //
// query+= "f_id=\'"+operator.getF_id()+"\',f_work_name=\'"+operator.getF_work_name()+"\',f_descr=\'"+operator.getF_descr()+"\',"+
// "startTime=\'"+operator.getStartTime()+"\',f_branch_id=\'"+operator.getF_branch_id()+"\'";
// //                System.out.println(query)

// const fetchOperator = require('./all-operator');
// const createConnectionPool = require("../database/SitDB");
// const pool = createConnectionPool();

var operatorInsertion = function operatorInsertion(_x, _x2) {
  return (_ref = _ref || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee3(operators, pool) {
    var _ref2;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          console.log("Inserting operators...");
          // const operators = await fetchOperator();
          //   console.log(operators);
          operators.forEach(function (_x3) {
            return (_ref2 = _ref2 || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee2(op) {
              var _ref3;
              return _regenerator["default"].wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    op.forEach(function (_x4) {
                      return (_ref3 = _ref3 || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee(operator) {
                        var update, result, insert, insertResult;
                        return _regenerator["default"].wrap(function _callee$(_context) {
                          while (1) switch (_context.prev = _context.next) {
                            case 0:
                              _context.prev = 0;
                              update = "UPDATE employee_list SET f_work_name = ?,f_branch_id = ?, f_descr = ?, startTime = ? WHERE f_id = ?";
                              _context.next = 4;
                              return pool.query(update, [operator.workName, operator.branchId, operator.description, operator.startTime, operator.operatorId]);
                            case 4:
                              result = _context.sent;
                              if (!(result[0].affectedRows === 1)) {
                                _context.next = 10;
                                break;
                              }
                              console.log("Operator Updated");
                              return _context.abrupt("return");
                            case 10:
                              insert = "INSERT INTO employee_list(f_id,f_work_name,f_branch_id,f_descr,startTime) VALUES(?,?,?,?,?)";
                              _context.next = 13;
                              return pool.query(insert, [operator.operatorId, operator.workName, operator.branchId, operator.description, operator.startTime]);
                            case 13:
                              insertResult = _context.sent;
                              if (!(insertResult.affectedRows === 1)) {
                                _context.next = 17;
                                break;
                              }
                              console.log("Operator Inserted");
                              return _context.abrupt("return");
                            case 17:
                              _context.next = 22;
                              break;
                            case 19:
                              _context.prev = 19;
                              _context.t0 = _context["catch"](0);
                              console.log(_context.t0);
                            case 22:
                            case "end":
                              return _context.stop();
                          }
                        }, _callee, null, [[0, 19]]);
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
module.exports = operatorInsertion;